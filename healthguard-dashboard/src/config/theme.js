export const theme = {
  colors: {
    background: '#000000', // Pure black for OLED-like depth
    surface: 'rgba(28, 28, 30, 0.6)', // Apple-like dark gray with transparency
    surfaceHighlight: 'rgba(44, 44, 46, 0.8)',
    primary: '#0A84FF', // Apple system blue (Dark Mode)
    critical: '#FF453A', // Apple system red (Dark Mode)
    warning: '#FFD60A', // Apple system yellow (Dark Mode)
    success: '#32D74B', // Apple system green (Dark Mode)
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(235, 235, 245, 0.6)',
      tertiary: 'rgba(235, 235, 245, 0.3)'
    },
    border: 'rgba(255, 255, 255, 0.1)', // Subtle separators
    glass: 'rgba(255, 255, 255, 0.1)'
  },
  fonts: {
    primary: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
    mono: '"SF Mono", "Menlo", "Monaco", "Courier New", monospace'
  },
  shadows: {
    card: '0 4px 24px rgba(0, 0, 0, 0.4)', // Softer, deeper shadow
    glowCritical: '0 0 30px rgba(255, 69, 58, 0.4)'
  },
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '18px', // Apple-like curvature
    xl: '24px'
  },
  blur: {
    default: 'blur(20px)',
    heavy: 'blur(40px)'
  }
};
