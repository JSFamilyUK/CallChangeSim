# Call Change Simulator - User Guide

## Main Interface Elements

### Bell Number Buttons

At the top of the simulator, you'll find buttons for selecting the number of bells (5, 6, 8, 10, or 12). These determine how many bells you'll be working with.

### Icons and Controls

The simulator features several important icons:

- Reference Box - Access guided call change sequences
- Patterns Box - Access and manage pattern collections
- Target Icon - Jump to a specific pattern
- Reset Icon - Reset the simulator to various states
- Help Icon - Access this guide

### Current Order Display

The current order of bells is displayed in a row, with visual indicators for:

- Normal bells (white background with blue border)
- Recently swapped bells (red border)
- Bells in their correct position for the target pattern (light green background)

### Pattern Controls

The pattern dropdown allows you to select a target pattern. When a pattern is selected, bells will be highlighted in green when they reach their correct position.

### Playback Controls

Three main control buttons manage the ringing - shown and hidden as necessary:

- Go - Starts bell sound playback
- Stand - Stops bell sound playback
- Rounds - Resets the bells to rounds order (1234...)

### Bell Selection Area

The bell selection area is where you interact with the bells and make call changes:

**Bell Selection Icons**:

- Each bell is represented by a numbered icon
- Icons are arranged in a row, showing the current order of the bells
- When you click a bell, it gets highlighted in blue
- Select two bells to make a change
- Your selection will be applied at the next handstroke if the bells are playing, or immediately if not
- When calling down, a "Lead" button will become visible

**Additional Elements**:

- The pattern prompt appears below the bell icons. It shows the bell order for the current target pattern
- When a pattern sequence is active, a sequence counter appears showing where you are in the sequence
- Error messages are temporarily displayed in this area if you attempt an invalid change

## Dialog Boxes

### Reference Box

The Reference Box is a powerful tool for learning call change sequences. When you open it, you'll see:

**Bell Number Selection** - Choose the number of bells to use

- The Reference Box bell number will always inherit the current number of bells in the main simulator when it opens

**Calling Style Selection** - Choose whether you want to use the "Calling Up" or "Calling Down" style

- This setting is synchronised with the main simulator's options
- Calling Up: The lower-numbered bell is called up (e.g., "2 to 1")
- Calling Down: The higher-numbered bell is called down (e.g., "1 to 2")

**Pattern Selection** - Set your patterns in the two dropdown menus:

- Start Pattern: Select your starting pattern (e.g., Rounds)
- End Pattern: Select your target pattern

**Example Change Sequence** - Shows the following for each change needed to get from the start pattern to the end pattern

- The call (e.g., "2 to 1")
- The resulting pattern after the call has been made
- Which line in the example, if any, matches the current bell order in the simulator (Matches are highlighted with a green border)

### Patterns Box

The Patterns Box allows you to select and work with different patterns. When you open it, you'll see:

**Custom Call Change Sequence button**:

- Used to open the Custom Call Change Sequence builder

**Pattern Selection Interface**:

- A list of available patterns for the current number of bells
- Each pattern shows its name and the actual bell order for that pattern
- Clicking a pattern immediately loads it into the simulator

### Pattern Sequence Builder

The Pattern Sequence Builder is a tool for creating custom sequences of patterns:

**Sequence Builder Controls**:

- Start Sequence button to begin the sequence
- Undo button to remove the last added pattern
- Grid of available patterns to select from
- Close button to exit the builder

**Available Functionality**:

- You can build a sequence using multiple patterns
- Patterns can be used more than once in the sequence
- The undo button removes the last pattern added
- The sequence numbers are displayed on the right
- When your sequence is ready, click "Start Sequence" to load it into the simulator

**Sequence Counter**:

- Appears in the main interface when a sequence is active
- Shows the current pattern number in the sequence
- Click to view the full sequence in a popup

**Sequence Popup**:

- Displays the complete sequence of patterns
- Highlights the current pattern in green
- Can be dismissed by clicking or pressing Escape

### Jump Feature

The Jump feature (target icon) allows you to:

- Instantly move to a specific pattern
- Practice transitions between patterns without the need to start in rounds
- Combine this feature with the Reference Box functionality

### Options

The Options menu provides important settings that affect how the simulator works:

**Calling Style**:

- Choose between "Calling Up" and "Calling Down"

**Open Handstroke**:

- Choose whether or not to have a handstroke gap

**Offline Mode**:

- Choose realistic bells sounds or generated tones

**Spatial Sound**:

- Adds subtle 3D stereo effect - best used with headphones

### Resetting

The simulator provides two main reset options:

**Restart Pattern**:

- Available whenever a pattern sequence is active
- Resets an active pattern sequence to the start

**Reset Everything**:

- Available at any time
- Resets the entire simulator to its initial state

## Basic Usage

### Change Calling

The simulator can be used in two modes:

**Without Bells**:

- Use without sound for silent practice
- Ideal for following along at practices or where sounds are not appropriate
- Bell selections and other changes are applied immediately
- All features remain available without sound

**With Bells**:

- Use with sound for a more realistic experience
- Higher numbers of bells have a faster peal speed
- Bell selections and other changes are applied at the next handstroke

**To call changes**:

- Use the Go button to begin playback if desired
- Select the bells you want to swap according to the rules of your chosen calling style
- The selection will be checked against the calling style rules and applied if it is valid
- Any errors will displayed at the bottom of the bell selection area

Remember to follow the rules for your selected calling style.

### Using Playback Controls

The simulator provides three main playback control buttons:

**Go Button**:

- Starts the ringing sequence
- Only visible when the simulator is in a stopped state
- Once the bells begin ringing, the Go button will be hidden

**Stand Button**:

- Stops the ringing sequence
- Only visible when the bells are ringing
- When clicked, a Stand notification will be displayed
- The bells will stop at the next handstroke

**Rounds Button**:

- Only visible when the bells are not in Rounds order
- When clicked, a Rounds notification will be displayed
- The bells will return to rounds at the next handstroke

**Important Notes**:

- Stand and Rounds actions are applied at the next handstroke
- If the bells are ringing, a notification will appear showing the pending action
- The notification will remain visible until the action is applied at the next handstroke
- You cannot perform a new action while the previous action is still in progress

### Working with Patterns

You can work with patterns in several ways:

**Single Pattern Selection**:

- Use the pattern dropdown in the main interface to select a target pattern
- Bells will be highlighted in green when they reach their correct position
- Alternatively, use the Patterns Box to select and load a pattern directly

**Pattern Pairs**:

- Use the Reference Box to get suggested routes between patterns
- The Reference Box shows the most efficient sequence of changes to reach your target pattern
- This is particularly helpful when learning new patterns or practicing transitions

**Pattern Sequences**:

- Use the Pattern Sequence Builder to create sequences with multiple patterns
- You can include the same pattern multiple times in a sequence
- The simulator will automatically progress through the sequence as you achieve each pattern

### Pattern Sequences

To create and use pattern sequences:

**Starting a New Sequence**:

- Open the patterns box from the icon in the main simulator
- Click the "Custom Call Change Sequence" button to open the sequence builder

**Building the Sequence**:

- Click on patterns in the order you want them to appear
- Each pattern you click will be added to the sequence
- Use the Undo button to remove the last pattern if needed
- You can add as many patterns as needed

**Starting the Sequence**:

- Click "Start Sequence" when you're ready to begin
- The sequence will be immediately available in the main simulator
- The bells will always begin in Rounds
- Make call changes in the simulator to achieve each pattern in sequence
- The simulator will automatically progress to the next pattern when you achieve the current one
- Use the Reference Box for guidance on the current change if you want ideas

**Viewing your progress**:

- The sequence counter will show you where you are in the sequence (1 of 3 for example)
- Click the sequence counter in the main interface to view the popup
- The popup shows your entire sequence with the current pattern highlighted in green
- Click anywhere on the screen to hide the popup

### Using the Reference Box

The Reference Box helps you learn call change sequences:

**Opening the Reference Box**:

- Open the reference box using the magnifying glass icon in the main simulator
- Select your desired number of bells (5-12)
- Choose your preferred calling style (Up/Down)

**Set up the Reference Patterns**:

- Select your start and end patterns from the dropdowns
- The sequence will automatically update to show the required changes

**Reference Box Uses**:

- Load pairs of patterns to see the most efficient route
- Compare the calls needed for different calling styles
- Use the reference box example changes as a guide while practicing in the main simulator
- Help navigate through a pattern sequence if you are unsure of where to start with a specific pair of patterns

**Important Notes**:

- The Reference Box will always load with the same number of bells as are active in the simulator
- Previously selected pairs of patterns and the respective changes will remain available unless you change the number of bells in the simulator before reopening the Reference Box
- The sequence display updates automatically when you change any settings
- The sequence shows an efficient path between your selected patterns

### Using the Jump Feature

The Jump feature allows you to instantly move to any pattern:

- First, select your desired pattern from the pattern dropdown in the main interface
- Click the target icon in the main interface
- The simulator will instantly update to show the selected pattern
- All bells will be in their correct positions for the new pattern

**Important Notes**:

- The Jump feature is particularly useful for practicing specific patterns or transitions
- You can use it in combination with the Reference Box to practice specific sequences
- Jumping to a new pattern adds a "Jump" entry to your change history, preserving all previous entries

### Reset Options

The simulator provides two main reset options:

**Restart Pattern**:

- Only available when a pattern sequence is active
- Displays a Restart notification until the next handstroke if the bells are playing
- Resets the bells to rounds
- Clears the change history except for the initial "Go!" entry
- Maintains the current pattern sequence but resets it to the start
- If playback is active, the reset will be queued and applied at the next handstroke

**Reset Everything**:

- Available at any time
- Resets the pattern dropdown to its default state
- Resets the bells to rounds order (1234...)
- Clears the change history except for the initial "Go!" entry
- Clears any active pattern sequence
- Removes the pattern sequence counter from the display
- If playback is active, a notification will appear showing the pending reset
- The reset will be queued and applied at the next handstroke

**Important Notes**:

- Both reset options can be used while playback is active
- When a reset is queued during playback, a notification will appear
- The notification will remain visible until the reset is applied at the next handstroke
- You cannot trigger a reset while another action is still pending
