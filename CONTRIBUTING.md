# Contributing to Cereal

Thank you for your interest in contributing to Cereal! This document provides guidelines for development and contribution.

## Development Phases

The project is organized into 8 phases. We're currently on:

**✅ Phase 1: Foundation (Complete)**

**🔄 Phase 2: Core Recording (Next)**

See [README.md](README.md) for the complete roadmap.

## Getting Started

1. **Set up your development environment**
   - Follow the [SETUP.md](SETUP.md) guide
   - Ensure all prerequisites are installed
   - Get the app running locally

2. **Understand the codebase**
   - Review the project structure in README
   - Familiarize yourself with the tech stack
   - Read through existing code

3. **Pick a task**
   - Check the current phase todos
   - Look for issues labeled "good first issue"
   - Or propose a new feature

## Code Standards

### TypeScript

- **Use TypeScript**: No `any` types unless absolutely necessary
- **Type Everything**: Functions, props, state, etc.
- **Interfaces over Types**: Prefer interfaces for object shapes
- **Export Types**: Make types reusable

```typescript
// Good
interface MeetingCardProps {
  meeting: Meeting;
  onPress: (id: string) => void;
}

const MeetingCard: React.FC<MeetingCardProps> = ({ meeting, onPress }) => {
  // ...
};

// Avoid
const MeetingCard = (props: any) => {
  // ...
};
```

### React Components

- **Functional Components**: Use hooks, not class components
- **Component Organization**: One component per file
- **Props Destructuring**: Destructure props in function signature
- **Memoization**: Use React.memo, useMemo, useCallback when appropriate

```typescript
// Good
export const Button: React.FC<ButtonProps> = React.memo(({ 
  onPress, 
  children 
}) => {
  const handlePress = useCallback(() => {
    onPress();
  }, [onPress]);

  return <TouchableOpacity onPress={handlePress}>{children}</TouchableOpacity>;
});

// Avoid
export function Button(props) {
  return <TouchableOpacity onPress={() => props.onPress()}>{props.children}</TouchableOpacity>;
}
```

### Styling

- **StyleSheet.create**: Always use StyleSheet.create
- **Theme Usage**: Use theme colors, spacing from constants
- **Responsive Design**: Consider different screen sizes
- **Dark Mode**: Support both light and dark themes

```typescript
// Good
const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    backgroundColor: theme.colors.surface,
  },
});

// Avoid
const styles = {
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
};
```

### State Management

- **Zustand Stores**: For global state
- **Local State**: For component-specific state
- **Async Operations**: Handle loading and error states

```typescript
// Good
const { meetings, isLoading, error } = useMeetingStore();

if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;

// Avoid
const meetings = useMeetingStore().meetings;
// No loading or error handling
```

## File Organization

### Component Files

```typescript
// ComponentName.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

interface ComponentNameProps {
  // Props
}

export const ComponentName: React.FC<ComponentNameProps> = ({ 
  // Props
}) => {
  const theme = useTheme();
  
  // Hooks
  
  // Handlers
  
  // Render
  return (
    <View style={styles.container}>
      {/* Content */}
    </View>
  );
};

const styles = StyleSheet.create({
  // Styles
});
```

### Service Files

```typescript
// serviceName.ts
import { API_CONFIG } from '../constants/config';

class ServiceName {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_CONFIG.someBaseUrl;
  }

  async someMethod(): Promise<ReturnType> {
    try {
      // Implementation
    } catch (error) {
      console.error('Error in someMethod:', error);
      throw error;
    }
  }
}

export const serviceName = new ServiceName();
```

## Git Workflow

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `refactor/description` - Code refactoring
- `docs/description` - Documentation updates

### Commit Messages

Follow conventional commits:

```
type(scope): description

[optional body]
[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(recording): add pause/resume functionality
fix(audio): resolve playback sync issue
docs(api): update AssemblyAI integration docs
refactor(store): simplify meeting state management
```

### Pull Requests

1. **Create a branch** from main
2. **Make your changes** following code standards
3. **Test thoroughly** on Android device/emulator
4. **Update documentation** if needed
5. **Submit PR** with clear description

PR Template:
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on Android emulator
- [ ] Tested on physical device
- [ ] All existing tests pass
- [ ] Added new tests if applicable

## Screenshots (if UI changes)
[Add screenshots]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed the code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No console warnings/errors
```

## Testing

### Unit Tests

```typescript
// ComponentName.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('should render correctly', () => {
    const { getByText } = render(<ComponentName />);
    expect(getByText('Expected Text')).toBeTruthy();
  });

  it('should handle press event', () => {
    const onPress = jest.fn();
    const { getByText } = render(<ComponentName onPress={onPress} />);
    
    fireEvent.press(getByText('Button'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

Run tests:
```bash
npm test
```

## Performance Guidelines

1. **Optimize Re-renders**: Use React.memo, useMemo, useCallback
2. **List Optimization**: Use FlatList for long lists, keyExtractor
3. **Image Optimization**: Use appropriate image sizes, caching
4. **Animation Performance**: Use React Native Reanimated, run on UI thread
5. **Bundle Size**: Avoid large dependencies

## Accessibility

1. **Labels**: Add accessibilityLabel to touchable elements
2. **Hints**: Use accessibilityHint for non-obvious actions
3. **Roles**: Set accessibilityRole appropriately
4. **Screen Readers**: Test with TalkBack (Android)

```typescript
<TouchableOpacity
  accessibilityLabel="Start Recording"
  accessibilityHint="Double tap to begin recording the meeting"
  accessibilityRole="button"
>
  <Icon name="microphone" />
</TouchableOpacity>
```

## Documentation

- **Code Comments**: Explain "why", not "what"
- **JSDoc**: Document public APIs and complex functions
- **README Updates**: Keep README current with features
- **API Docs**: Update API_DOCUMENTATION.md for new integrations

```typescript
/**
 * Uploads audio file to transcription service and returns upload URL
 * @param audioUri - Local file URI of the audio recording
 * @returns Promise resolving to the upload URL
 * @throws Error if upload fails or file is too large
 */
async uploadAudio(audioUri: string): Promise<string> {
  // Implementation
}
```

## Common Issues

### Metro Bundler Issues
```bash
expo start -c
```

### Android Build Issues
```bash
cd android && ./gradlew clean && cd ..
```

### Package Conflicts
```bash
rm -rf node_modules package-lock.json
npm install
```

## Questions?

- Check existing documentation
- Review similar code in the project
- Ask in GitHub issues
- Reference React Native / Expo docs

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to Cereal! 🎉
