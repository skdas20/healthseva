// Global type definitions for HealthSeva

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
}

export interface Doctor {
  id: string;
  name: string;
  email: string;
  specialty: string;
  experience: number;
  rating: number;
  reviews: number;
  avatar: string;
  qualifications: string[];
  languages: string[];
  consultationFee: number;
  availability: {
    days: string[];
    timeSlots: string[];
  };
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: 'video' | 'audio' | 'chat' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  reason: string;
  notes?: string;
}

export interface HealthRecord {
  id: string;
  patientId: string;
  type: 'diagnosis' | 'prescription' | 'lab-result' | 'vaccination' | 'allergy';
  title: string;
  description: string;
  date: string;
  doctorId?: string;
  attachments?: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'consultation' | 'diagnostic' | 'treatment' | 'wellness';
  price: number;
  duration: number; // in minutes
  image: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
  treatment?: string;
}

export interface HealthTip {
  id: string;
  title: string;
  content: string;
  category: 'nutrition' | 'exercise' | 'mental-health' | 'prevention' | 'general';
  image: string;
  readTime: number; // in minutes
  publishedDate: string;
  author: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  preferredContact: 'email' | 'phone';
}

export interface NewsletterForm {
  email: string;
  interests: string[];
}

// Animation and UI Types
export interface AnimationVariant {
  initial?: object;
  animate?: object;
  exit?: object;
  transition?: object;
}

export interface MotionProps {
  variants?: AnimationVariant;
  initial?: string | object;
  animate?: string | object;
  exit?: string | object;
  transition?: object;
  whileHover?: object;
  whileTap?: object;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface FormState {
  isSubmitting: boolean;
  isValid: boolean;
  errors: Record<string, string>;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// Services Types
export interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  color: string;
  bgGradient: string;
}

export interface ServicesCarouselProps {
  services?: ServiceItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showNavigation?: boolean;
  showDots?: boolean;
}

// Benefits Types
export interface BenefitItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  shortDescription: string;
  detailedExplanation: string;
  stats?: {
    value: string;
    label: string;
  };
  color: string;
}

export interface BenefitsProps {
  benefits?: BenefitItem[];
  title?: string;
  subtitle?: string;
}

// Problems Types
export interface ProblemItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  solution: string;
  severity: 'high' | 'medium' | 'low';
  color: string;
}

export interface ProblemsProps {
  problems?: ProblemItem[];
  title?: string;
  subtitle?: string;
}

// Animation Types
export interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}
