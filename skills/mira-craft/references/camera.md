<!-- generated from the registry by comfy_study/comfy_video/build_skills.py; edit the registry, not this file -->
# Camera

CAMERA VOCABULARY - name the move with real camera language taken from the MOVE list below, never with a vague word like 'dynamic', 'epic' or 'cinematic'. Say where the move starts and where it ends ('starts wide on the counter, ends on a medium of her hands'). Pace it with exactly one word from this ladder, slowest first: imperceptible, slow, steady, smooth, quick, whip. Slow is the cinematic default; on most current models anything faster than 'smooth' warps anatomy and smears detail, so spend the energy on the secondary motion instead - unless the MODEL section says that model handles fast camera work, in which case pick the energy the idea actually needs. Order the sentence subject, then action, then camera, then lens and framing, then light - models weight earlier words more heavily. Name what must stay READABLE while the move runs - the face, the label, the hands, the horizon: an unpinned subject is exactly where a moving camera warps it. Any lateral, rotating or arcing move states its direction (left or right, clockwise or anticlockwise) - 'the camera orbits' without a side is a coin flip. Three moves fail on MOST models in this line-up and must not be written unless the MODEL section explicitly allows them: handheld shake (on most models it belongs in post), a complex move sustained past ten seconds, and a move that travels through SOLID MASS - the last one fails everywhere. Passing through an OPENING is a different move and IS allowed: a doorway, a window, an arch, a gap between two objects, held centred as the transition point. Where the model section names a move as that model's documented strength, the model section WINS: it was written from that vendor's own guide, and Runway Gen-4.5 in particular documents sweeping arcs, crash zooms, whip pans and handheld shake as things it does well. Seedance 2.5 is the other exception, proven in live runs (2026-09-06): written in PHASES with tenths of a second, it executed a top-down crash dive, a full orbit returning to its start, a whip pan fusing two locations, a dolly zoom, a camera struck and falling while recording, a locked day-night cycle and a pass through a mirror - with native sound - so on that model a fast trick is written at the energy the idea needs. The MODEL section decides HOW MANY moves one prompt may name and how their timing is written; this bank decides only which words name them. These names are labels for CHOOSING, never text for the prompt: write the described motion in plain English words and never emit a bare label like handheld_follow.

MOTIVATION RULE: the camera moves for one of three reasons only - it FOLLOWS a moving subject, it CHANGES MEANING (reveal, growing intensity, attention handoff), or the MOVE IS THE CONCEPT: a named trick chosen as the mechanic of the clip, the subject holding one simple repeatable action underneath it. A move without a reason wastes the only beat a 5-second clip has: when in doubt, lock the camera and move the subject. Every move states where it ends. Ask for handheld as 'subtle handheld drift', never 'shaky'. TRICK AS MECHANIC - when the move is the concept, pick it by what it sells: a full orbit that decelerates into a locked front view sells volume and the packshot; a crash dive from a top-down hold sells scale collapsing into one detail - the reveal; a whip pan that lands in a second location sells two states of one story - before and after, here and there; a locked frame while day turns to night sells endurance - it works all day, it lasts; a camera that is struck and keeps recording from the ground sells raw energy and toughness; a dolly zoom sells the moment of realisation. Any fast trick is written in PHASES - a still hold, the acceleration, the peak with its motion blur, the deceleration, the settle - with tenths of a second inside the shot, and the prompt names what stays constant across the trick: the grade and key light on both sides of a whip, the lighting between the wide and the close of a dive, the pose while the light changes.

### Moves

- **`push_in`** — slow push-in that eases to a stop, the camera closing about a third of the distance to the subject
- **`crash_zoom`** — fast zoom that snaps in on the subject and holds there - one beat only, and only where the model tolerates quick motion
- **`dolly_in`** — the camera travels forward on an imaginary track and perspective compresses as it goes - a move through space, not a zoom
- **`dolly_out`** — the camera travels backward on its track, opening the space out around the subject
- **`super_dolly`** — long gliding dolly straight down the centre line with the subject held dead centre the whole way
- **`dolly_zoom`** — the camera dollies in while the lens zooms out, so the subject stays the same size and the background warps behind them
- **`orbit_360`** — the camera circles the subject through a full turn at a constant radius and speed and returns to the starting angle - the subject keeps its own action for the whole turn
- **`arc_left`** — the camera sweeps a shallow arc to the left around the subject, revealing one more side of it
- **`arc_right`** — the camera sweeps a shallow arc to the right around the subject, revealing one more side of it
- **`lazy_susan`** — the subject turns slowly on its own axis while the camera stays locked - the product-shot version of an orbit
- **`fpv_drone`** — one continuous flying shot that dives, banks and skims past the subject
- **`crane_up`** — the camera rises vertically on a crane, opening the frame from the subject out to the whole space
- **`crane_down`** — the camera descends vertically on a crane, closing from the wide space down onto the subject
- **`jib`** — a short vertical lift that also drifts forward, settling slightly above the subject
- **`overhead_descent`** — the camera looks straight down and lowers toward the subject, flattening the scene into a graphic layout
- **`bullet_time`** — the action holds almost frozen while the camera arcs around it
- **`snorricam`** — the camera is locked to the subject's body, so they stay fixed in frame while the world swings behind them
- **`robo_arm`** — a precise mechanical move that changes height and angle mid-shot and lands on a locked composition
- **`whip_pan`** — a fast horizontal pan that blurs the frame and settles on a new subject
- **`object_pov`** — the frame is the point of view of an object - the product, the mirror, the window
- **`hyperlapse`** — the camera travels a long distance while time compresses, the subject staying centred
- **`slider_reveal`** — a short lateral slide that uses a foreground object to wipe the subject into view
- **`rack_focus`** — the camera holds still and focus travels from the foreground to the subject, or back
- **`handheld_follow`** — a loose, gently breathing handheld shot that walks with the subject - motivated drift, never a shake
- **`locked_off`** — the camera sits on a tripod and does not move at all; everything alive in the frame is the subject and the secondary motion
- **`pan_left`** — the camera stays in place and rotates horizontally to the left, new space entering from the left edge while the horizon stays level
- **`pan_right`** — the camera stays in place and rotates horizontally to the right, new space entering from the right edge while the horizon stays level
- **`tilt_up`** — the camera stays in place and rotates upward, travelling up the subject to land on what is above it
- **`tilt_down`** — the camera stays in place and rotates downward, travelling down the subject to land on what is below it
- **`zoom_in`** — the lens alone tightens on the subject - the camera does not move, so perspective stays exactly as it was
- **`zoom_out`** — the lens alone widens off the subject - the camera does not move, so the surrounding space simply appears
- **`truck_left`** — the whole camera travels left on a straight horizontal path with the lens still facing forward, the scene sliding across the frame
- **`truck_right`** — the whole camera travels right on a straight horizontal path with the lens still facing forward, the scene sliding across the frame
- **`pedestal_up`** — the whole camera rises straight up with the lens kept level - height changes, aim does not
- **`pedestal_down`** — the whole camera sinks straight down with the lens kept level - height changes, aim does not
- **`follow_ots`** — the camera travels behind the subject at shoulder height, their shoulder or head anchoring the foreground while the way ahead stays readable
- **`tracking_side`** — the camera travels parallel to the subject at a constant distance, holding them in profile or three-quarter as the background streams past
- **`tracking_reverse`** — the camera travels backwards in front of the walking subject, holding their face steady while the world recedes behind them - the walk-and-talk
- **`tracking_low`** — the camera travels alongside the subject at ground or knee height, the floor plane rushing through the bottom of the frame
- **`tracking_vehicle`** — the camera travels with a moving vehicle, holding it steady in frame while the road and the landscape sweep past
- **`chase_follow`** — the camera chases a fast-moving subject up close, reframing as it goes - only where the model tolerates quick motion
- **`drone_pull_back`** — the camera flies backwards and upwards away from the subject, the scene opening from a detail out to the whole location
- **`aerial_wide`** — a high, slow flight along a broad path, the landscape or a distant subject read at full scale
- **`time_lapse_locked`** — the camera is locked and time runs fast through the frame - light, crowds and clouds move, the composition never does
- **`pass_through`** — the camera glides forward through an OPENING - a doorway, window, arch or gap - and arrives in the space beyond, the opening centred as the transition point
- **`push_past`** — the camera glides forward past a close foreground object that sweeps by the lens, revealing the subject behind it
- **`speed_ramp`** — the shot fluidly shifts between slow motion and real time within one take - a key beat stretches, then snaps back on the action
- **`camera_roll`** — the camera rotates around the lens axis mid-move, the horizon tilting or spinning while the subject holds frame - dreamlike, gravity-free
- **`low_mode_glide`** — the camera glides forward inches above the ground at ankle height, foreground rushing under the lens toward the subject
- **`probe_macro`** — an ultra-macro perspective travels through and around tiny detail - into a glass, between ingredients - deep focus, exaggerated perspective
- **`screw_rise`** — the camera corkscrews upward around the subject - orbit, rise and roll fused into one spiraling helix reveal
- **`snap_zoom`** — quick rhythmic punch-ins from medium to close between beats, deliberately digital-feeling, hitting on the accents
- **`pov_first_person`** — true first-person camera with subtle head-bob, the subject's own hands entering frame to interact with the scene
- **`vertigo_orbit`** — an orbit around the subject combined with a slow zoom shift, so the background rotates and stretches at once - trance-like
- **`whip_tilt`** — a fast vertical whip from sky or ceiling down onto the subject with motion blur, landing composed - a punchy 9:16 opener
- **`infinite_zoom`** — a continuous zoom that keeps traveling into a detail of the frame which becomes a whole new scene, nested like worlds
- **`arc_reveal`** — the camera arcs around a foreground object until a hidden second subject slides into view behind it - curiosity and payoff in one move
- **`creep_zoom`** — an almost imperceptible slow push toward the subject, tension building without the viewer noticing the movement
- **`drone_crash_dive`** — from a locked top-down hold at extreme altitude the camera plunges straight down onto the subject and brakes into a tight close-up - one continuous vertical move, the subject a speck at the start and filling the frame at the end, the light identical in both
- **`camera_drop`** — the camera is a physical object in the scene: something strikes it, it tumbles through the air and lands tilted on the ground still recording, and the subject walks back into the new low-angle frame - the fall is the shot, never a cut
- **`whip_pan_jump`** — one fast whip pan blurs the frame out of one location and lands sharp in a second one inside the SAME take - the smear is the seam, and both places share one grade and one key light

### Move combos

- **`reveal_pull`** — the camera pulls back to reveal a wider truth about the scene - one shot becomes a two-act micro-story
- **`follow_into_freeze`** — the camera tracks with the subject, then settles into a locked static frame as they stop - the freeze is where a CTA or text overlay lands
- **`push_to_ecu`** — a slow push-in that ends as an extreme close-up on the eyes or the product label - emotional or informational climax
- **`orbit_to_lockoff`** — an orbit around the product that decelerates into a locked-off front view - show the volume, then hold the packshot
- **`whip_pan_match`** — a fast whip pan out of one shot matched by a whip pan into the next - stitches two generations into one continuous move
- **`rack_focus_reveal`** — focus racks from the blurred foreground product to the face behind it - attention handoff without a cut
- **`tilt_up_hero`** — the camera tilts up along the subject or bottle and ends on a low-angle hero framing - vertical frames love vertical moves
- **`match_cut_carry`** — a match cut: two shots joined by identical framing, shape or motion, the camera move carrying straight through the cut
- **`impossible_pass`** — one continuous move passes through a solid object, mirror or keyhole and emerges in a new location or scale - a seamless impossible transition
- **`hold_dive_settle`** — a locked hold high above the subject, then one fast plunge straight down that decelerates and settles into a tight close-up - the hold is the setup, the settle is the payoff, and the lighting is identical at both ends
- **`drop_and_reenter`** — the camera is knocked from the subject's hands or feet, tumbles, lands tilted on the ground still recording, and after a beat of stillness the subject walks back into the low-angle frame and leans toward the lens - the fall and the return are one take

### Framing and angles

- **`mcu_default`** — medium close-up, chest up - the vertical workhorse: talking heads, trust, product in hand
- **`ecu_accent`** — extreme close-up filling the frame - the director's order to look HERE: an eye, a drop, a button, a label
- **`insert_proof`** — insert shot, close on hands operating the product - proof it works, tactile truth
- **`macro_texture`** — macro shot with extreme material detail - food, liquids, cosmetics, fabric, metal
- **`pov_ugc`** — first-person POV, hands entering the frame from the bottom - unboxing authenticity, 'you are here'
- **`ots_glance`** — over-the-shoulder framing with a soft foreground shoulder - a customer's-eye view of a screen or shelf
- **`wide_breath`** — a single wide shot held 0.5-1s as a breath - context, scale, then back to close work
- **`topdown_flatlay`** — top-down overhead flat lay - kits, ingredients, what's-in-the-box order
- **`low_hero`** — low angle looking up - status and power: the hero packshot, sneakers, bottles, machines
- **`high_problem`** — high angle looking down - smallness and trouble: the 'before' half of a story
- **`dutch_alarm`** — dutch angle with a tilted horizon - one frame of unease before the fix arrives, never more
- **`just_below_eyes`** — camera a touch below the eye line - a quiet authority upgrade for a speaking creator

## Time

TIME IS A TOOL, AND IT IS SEPARATE FROM CAMERA SPEED. State the speed of TIME and the speed of the CAMERA as two different things, because models conflate them by default and the result is a uniformly slow clip that reads as a screensaver. When time is slowed or stopped, the world slows - the camera does not have to. Name the technique, name what it applies to, and name the moment it starts and ends. One time technique per clip: stacking two of them produces mush.

### Time techniques

- **`bullet_time`** — Time drops to a few per cent of normal while the CAMERA keeps moving freely through the almost-frozen scene. The critical instruction, and the one every model gets wrong without it: suspended objects hold their positions in WORLD SPACE and only drift microscopically; close-ups are created by REDUCING THE CAMERA-TO-OBJECT DISTANCE, never by flying the object toward the lens and never by scaling it up in frame. Say which objects are suspended and roughly where, so the camera's route between them is unambiguous, and say that they stay there when the camera leaves.
- **`speed_ramp`** — Speed changes inside one continuous take: normal into slow on the impact beat, or slow into normal as motion resumes. Name the exact moment of the ramp and what triggers it; an unmotivated ramp reads as a rendering fault.
- **`freeze_and_resume`** — Motion stops dead on a chosen frame, holds, then resumes from EXACTLY where it stopped, with existing momentum and gravity picking up again. Say that every object continues from its own held position rather than resetting or converging.
- **`time_lapse`** — The world runs far faster than real time - light travelling, crowds streaming, clouds compressing - usually against a locked-off or barely moving camera so the speed reads as time rather than as camera motion.
- **`reverse`** — Action plays backwards, and it only works when the physics are legible in reverse: something spilled reassembles, something scattered gathers. Say it is reversed motion, not merely 'played backwards', and keep the beat count small.
- **`match_on_time`** — A single continuous action is carried across a cut so the two shots read as one moment seen twice - the same gesture, the same instant, a new angle. The action must be described identically on both sides of the cut.
- **`day_night_cycle`** — A locked-off frame while a whole day passes through it: name the phases of light in order and give each its share of the clip - clear daylight, then sunset with the sky turning amber and pink and the buildings darkening, then twilight into night with windows and street lamps igniting and water shimmering, then dawn brightening back to day. The camera never moves and the subject's pose stays fixed for the whole cycle - only breathing and fabric in the wind - so all motion comes from light, sky, clouds and water. Say that the subject and the composition are identical at the start and at the end.
