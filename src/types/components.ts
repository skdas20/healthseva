// Navigation types
export interface NavigationLink {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

export interface NavigationProps {
  links: NavigationLink[];
  logo?: {
    text: string;
    icon?: React.ReactNode;
  };
  ctaText?: string;
  ctaHref?: string;
}

// Loading screen types
export interface LoadingScreenProps {
  isLoading: boolean;
  onComplete: () => void;
}

// Hero section types
export interface HeroProps {
  title: string;
  subtitle: string;
  primaryCta: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  secondaryCta: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  videoSrc?: string;
  socialLinks?: {
    platform: string;
    href: string;
    icon: React.ReactNode;
  }[];
}

// Briefcase animation types
export interface BriefcaseProps {
  isOpen: boolean;
  videoSrc?: string;
  onVideoPlay?: () => void;
}

// Floating elements types
export interface FloatingElement {
  id: string;
  icon: React.ReactNode;
  position: { x: number; y: number };
  delay: number;
  duration: number;
}

// WhatsApp button types
export interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  position?: 'bottom-right' | 'bottom-left';
}

// Contact and Modal Types
export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  hours: string;
}

export interface ContactFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: React.ReactNode;
}

export interface ContactSectionProps {
  onOpenModal?: () => void;
  contactInfo?: ContactInfo;
  features?: ContactFeature[];
  socialLinks?: SocialLink[];
}

export interface AppointmentFormData {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

export interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: AppointmentFormData) => Promise<void>;
}

// Services Carousel types
export interface ServicesCarouselProps {
  onBookAppointment?: () => void;
  services?: ServiceItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showNavigation?: boolean;
  showDots?: boolean;
}

export interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  color: string;
  bgGradient: string;
}
