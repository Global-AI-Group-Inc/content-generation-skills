# Scripting Unity through unity_execute_csharp

## The wrapper

Your code becomes the body of:

```csharp
using System; using System.Linq; using System.Collections.Generic;
using UnityEngine; using UnityEditor; using Object = UnityEngine.Object;
// + any `using` lines your code starts with
namespace MiraAgent { public static class ScriptN {
  public static object Run(MyBots.Mira.Editor.AgentContext mira) {
    object result = null;
    void print(object message) => mira.Print(message);
    /* your code, line 1 = agent.cs(1, …) */
    return result;
}}}
```

- Local functions and lambdas are fine; classes, structs and `MonoBehaviour` definitions are not.
- The whole call is one Undo group. Register creations: `mira.Created(obj)` (= `Undo.RegisterCreatedObjectUndo`);
  before changing an existing object: `Undo.RecordObject(obj, "Mira")`; adding a component:
  `Undo.AddComponent<Light>(go)`.
- `result` comes back as text: Unity objects as `name (Type)`, collections as `[a, b]`, plain objects as JSON.
- Output over 20 KB is cut; code over 40 000 characters is refused — split it.

## Recipes

Ground, three-point light, camera:

```csharp
var root = mira.Created(new GameObject("Blockout"));
var floor = GameObject.CreatePrimitive(PrimitiveType.Plane);
mira.Created(floor); floor.name = "Floor"; floor.transform.SetParent(root.transform);
floor.transform.localScale = new Vector3(2, 1, 2);          // a Plane is 10 m × 10 m at scale 1

GameObject Light(string name, LightType type, float intensity, Vector3 euler) {
    var go = mira.Created(new GameObject(name));
    go.transform.SetParent(root.transform);
    var l = go.AddComponent<Light>(); l.type = type; l.intensity = intensity;
    go.transform.rotation = Quaternion.Euler(euler);
    return go;
}
Light("LGT_key", LightType.Directional, 1.2f, new Vector3(40, -35, 0));
Light("LGT_fill", LightType.Directional, 0.35f, new Vector3(20, 140, 0)).GetComponent<Light>().shadows = LightShadows.None;
Light("LGT_rim", LightType.Directional, 0.8f, new Vector3(15, 170, 0));

var cam = mira.Created(new GameObject("Cam_Main"));
cam.tag = "MainCamera";
var c = cam.AddComponent<Camera>(); c.fieldOfView = 40;     // vertical FOV in degrees
cam.transform.position = new Vector3(0, 1.6f, -6);
cam.transform.LookAt(new Vector3(0, 1.2f, 0));
result = cam;
```

A material that works in every pipeline:

```csharp
var shader = Shader.Find("Universal Render Pipeline/Lit") ?? Shader.Find("HDRP/Lit") ?? Shader.Find("Standard");
var mat = new Material(shader) { color = new Color(0.8f, 0.8f, 0.78f) };
AssetDatabase.CreateAsset(mat, AssetDatabase.GenerateUniqueAssetPath("Assets/Mira/Materials/Clay.mat"));
```
(`Assets/Mira/Materials` must exist: `AssetDatabase.CreateFolder("Assets/Mira", "Materials")`.)

A camera move on a Timeline (what `unity_playblast` records):

```csharp
using UnityEngine.Timeline; using UnityEngine.Playables;
var cam = mira.Find("Cam_Main");
var clip = new AnimationClip { frameRate = 30 };
clip.SetCurve("", typeof(Transform), "localPosition.z", AnimationCurve.EaseInOut(0, -6, 5, -3));
AssetDatabase.CreateAsset(clip, "Assets/Mira/CamPush.anim");
var tl = ScriptableObject.CreateInstance<TimelineAsset>();
AssetDatabase.CreateAsset(tl, "Assets/Mira/Shot01.playable");
var track = tl.CreateTrack<AnimationTrack>(null, "Cam");
track.CreateClip(clip);
var director = mira.Created(new GameObject("Shot01")).AddComponent<PlayableDirector>();
director.playableAsset = tl;
director.SetGenericBinding(track, cam.AddComponent<Animator>());
```

## Traps

- **Domain reload.** Writing a `.cs` file and `mira.RequestRefresh()` recompiles after your answer; for a few
  seconds the bridge is away and `unity_status` shows `compiling: true`. Wait and call it again.
- **2022.3 vs 6.x.** `Object.FindObjectsByType<T>(FindObjectsSortMode.None)` exists from 2022.2; the old
  `FindObjectsOfType` warns on Unity 6. Check with `unity_search_api` when unsure.
- **Prefab instances.** Changing a child of a prefab instance makes an override; to change the asset use
  `PrefabUtility.LoadPrefabContents` / `SaveAsPrefabAsset` — ask the user first.
- **Play mode.** Do not enter Play mode; scripts with `[ExecuteAlways]` are the only ones that run in edit mode.
- **Selection.** `Selection.activeGameObject = go;` shows the user what you made.
