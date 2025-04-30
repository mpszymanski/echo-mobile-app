# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## License

This code is licensed under the Business Source License 1.1. You may view, modify, and contribute to the code, but not use it to create a competing social media application.

See the [LICENSE](LICENSE) file for more details.

## Code Formatting with Prettier

This project uses Prettier for code formatting to ensure a consistent code style across the codebase.

### Configuration

The Prettier configuration is defined in `.prettierrc.js` and follows the popular Expo style with the following key settings:

- Single quotes
- 2 spaces indentation
- 100 character line width
- ES5 trailing commas
- Semicolons at the end of statements
- Tailwind CSS class sorting (via prettier-plugin-tailwindcss)

### Usage

The following npm scripts have been added to package.json:

- `npm run format` - Format all eligible files in the project
- `npm run format:check` - Check if files are formatted correctly without modifying them

### Integration with ESLint

Prettier has been integrated with ESLint using `eslint-config-prettier` to disable ESLint rules that might conflict with Prettier's formatting.

### Ignored Files

Some files and directories are excluded from formatting. See `.prettierignore` for the complete list.

### Editor Integration

For the best development experience, it's recommended to install the Prettier extension for your code editor:

- VS Code: [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- WebStorm/IntelliJ: [Prettier](https://plugins.jetbrains.com/plugin/10456-prettier)

Configure your editor to format on save for a seamless experience.
