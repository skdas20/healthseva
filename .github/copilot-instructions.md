# HealthSeva Next.js Project Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a **HealthSeva** healthcare website built with Next.js 14, TypeScript, Tailwind CSS, and modern animation libraries.

## Technology Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom healthcare color palette
- **Animations**: Framer Motion & GSAP
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Video**: React Player

## Custom Color Palette
- **Primary**: Light blue (#3B82F6) to soft pink (#EC4899) gradients
- **Secondary**: Soft blue (#60A5FA) to lavender (#C084FC) gradients
- **Accent**: Gentle teal (#14B8A6)
- **Text**: Dark navy (#1E293B)
- **Background**: Pure white with subtle blue tints

## Folder Structure
```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
├── lib/             # Utility functions, animations, GSAP configs
├── types/           # TypeScript type definitions
public/
└── assets/          # Static assets (images, videos, etc.)
```

## Development Guidelines

### Component Creation
- Use TypeScript for all components
- Implement proper prop typing with interfaces
- Use Framer Motion for simple animations
- Use GSAP for complex timeline animations
- Follow the healthcare color scheme consistently

### Styling Conventions
- Use custom Tailwind classes defined in globals.css
- Preferred classes: `.btn-primary`, `.btn-secondary`, `.card`, `.card-gradient`, `.text-gradient`
- Use `.section-padding` and `.container-custom` for consistent spacing
- Implement smooth transitions and hover effects

### Animation Best Practices
- Use `fadeInUp`, `slideInLeft`, `staggerContainer` variants from `/lib/animations.ts`
- Implement GSAP animations using `/lib/gsap.ts` utilities
- Add scroll-triggered animations for better UX
- Use floating elements for visual appeal

### Healthcare-Specific Features
- Focus on accessibility and readability
- Implement trust-building elements (testimonials, certifications)
- Use medical iconography appropriately
- Ensure forms are user-friendly with proper validation
- Include emergency care prominent CTAs

### Code Quality
- Use the `cn()` utility from `/lib/utils.ts` for className merging
- Implement proper error handling
- Add loading states for better UX
- Use semantic HTML elements
- Follow WCAG accessibility guidelines

## Custom Utilities Available
- `cn()` - Class name merging
- Date/time formatting functions
- Email/phone validation
- Local storage utilities
- Debounce function
- Animation variants and GSAP configurations

When generating code for this project, prioritize user experience, accessibility, and the healthcare theme while maintaining the modern, professional aesthetic defined by the color palette and design system.
