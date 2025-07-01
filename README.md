# HealthSeva - Healthcare Website

A modern, responsive healthcare website built with Next.js 14, TypeScript, and Tailwind CSS. HealthSeva provides comprehensive medical services with a focus on user experience and accessibility.

## 🚀 Features

- **Modern Healthcare Design**: Clean, professional interface with healthcare-focused color palette
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Advanced Animations**: Smooth animations using Framer Motion and GSAP
- **Accessibility First**: WCAG compliant design for inclusive healthcare
- **Emergency Care**: Prominent emergency care call-to-actions
- **Doctor Profiles**: Comprehensive doctor information and booking system
- **Health Records**: Secure patient health record management
- **Appointment Booking**: Easy-to-use appointment scheduling system

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom healthcare color palette
- **Animations**: Framer Motion & GSAP
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Video**: React Player
- **Package Manager**: npm

## 🎨 Design System

### Color Palette
- **Primary**: Light blue (#3B82F6) to soft pink (#EC4899) gradients
- **Secondary**: Soft blue (#60A5FA) to lavender (#C084FC) gradients  
- **Accent**: Gentle teal (#14B8A6)
- **Text**: Dark navy (#1E293B)
- **Background**: Pure white with subtle blue tints

### Custom Components
- `.btn-primary` - Primary gradient buttons
- `.btn-secondary` - Secondary outline buttons
- `.card` - Standard cards with soft shadows
- `.card-gradient` - Gradient background cards
- `.text-gradient` - Gradient text effects
- `.section-padding` - Consistent section spacing
- `.container-custom` - Responsive container wrapper

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd healthsevanext
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── globals.css   # Global styles and Tailwind config
│   ├── layout.tsx    # Root layout component
│   └── page.tsx      # Home page
├── components/       # Reusable React components
│   ├── Header.tsx    # Navigation header
│   └── Hero.tsx      # Hero section
├── lib/             # Utility functions and configurations
│   ├── animations.ts # Framer Motion animation variants
│   ├── gsap.ts      # GSAP animation utilities
│   └── utils.ts     # Common utility functions
├── types/           # TypeScript type definitions
│   └── index.ts     # Global type definitions
public/
└── assets/          # Static assets (images, videos, etc.)
```

## 🎯 Key Features

### Healthcare-Focused Design
- Professional medical aesthetic
- Trust-building elements
- Emergency care prominence
- Accessibility compliance

### Advanced Animations
- **Framer Motion**: Page transitions, hover effects, and micro-interactions
- **GSAP**: Complex timeline animations, scroll-triggered effects, and parallax
- **Scroll Animations**: Elements animate as they enter the viewport
- **Floating Elements**: Subtle background animations for visual appeal

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interactions
- Flexible grid layouts

### Performance Optimized
- Next.js 14 App Router for fast navigation
- Optimized images and assets
- Code splitting and lazy loading
- SEO-friendly structure

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

### Coding Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting (configure as needed)
- **Component Structure**: Functional components with TypeScript
- **Styling**: Tailwind CSS with custom design system

### Animation Guidelines

1. **Framer Motion** for simple animations:
   - Page transitions
   - Hover effects
   - Modal animations
   - Form interactions

2. **GSAP** for complex animations:
   - Timeline-based sequences
   - Scroll-triggered animations
   - Parallax effects
   - Performance-critical animations

## 🔧 Configuration

### Tailwind CSS
Custom configuration with healthcare color palette, gradients, shadows, and animations. See `tailwind.config.ts` for complete setup.

### TypeScript
Strict type checking with custom type definitions for healthcare-related data structures.

### Next.js
App Router configuration with TypeScript and Tailwind CSS integration.

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

## 🎨 Animation System

### Framer Motion Variants
Pre-built animation variants available in `/src/lib/animations.ts`:
- `fadeInUp`, `fadeInDown`, `fadeInLeft`, `fadeInRight`
- `scaleIn`, `slideUpVariants`
- `staggerContainer` for coordinated animations
- `cardHover`, `buttonTap` for interactions

### GSAP Utilities
Advanced animation utilities in `/src/lib/gsap.ts`:
- Hero entrance animations
- Card stagger effects
- Text reveal animations
- Parallax scrolling
- Counter animations

## 🔒 Security & Privacy

- GDPR compliant data handling
- Secure form submissions
- Privacy-focused analytics
- HIPAA considerations for health data

## 📞 Support

For questions, issues, or contributions, please refer to the project documentation or contact the development team.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
