# Chatter Coding Challenge 🤖

### Difficulty: Hard | Time required: ~ 45 minutes

# Goals / Outcomes ✨
- To test knowledge of using sockets (socket.io) and events
- Understanding of callbacks, hooks and function references

# Pre-requisites ✅
None

# Requirements 📖
Most of the work needs to be done in the `Messages` components.

- Implement hooks such as `useEffect` and `useCallback` to handle events
- Scroll to the bottom of the messages list when sending/receiving a message
- Show the initial Botty message by default (can be found in `common/constants`)
- Use **sockets** to:
  - Send the user's message to Botty
  - Show a typing message when Botty is typing
  - Handle incoming Botty messages and display them

# Botty Socket Events
See the [Botty server](https://github.com/alexgurr/botty) documentation for more information.
- `bot-typing`: Emitted by Botty when they are typing in response to a user message.
- `bot-message`: Emitted by Botty with a message payload in response to a user message.
- `user-message`: Emitted by you/the client with a messsage payload

# Message Classes
We've provided `Message` components and classes. Here's some information about the classes.
- `.message--last`: The last message in a group
- `.message--typing`: The message the user sees when the recipient is typing
- `.message--me`: Denotes a user message

# Think about 💡
- References to functions and current hook state
- How to interact with socket.io, events and payloads
- How React contexts work

# What's Already Been Done 🏁
- Socket setup/configuration with the [Botty server](https://github.com/alexgurr/botty)
- All UX and UI, including for messages
- All components, including a message and typing message component
- A context for setting the latest message, which will change the preview in the left user list
- Hooks for playing send/receive sounds

# Screenshots 🌄

![screenshot-desktop](https://puu.sh/HoYEC/04b783de63.png)
![screenshot-mobile](https://puu.sh/HoYEw/9b760f91f7.png)