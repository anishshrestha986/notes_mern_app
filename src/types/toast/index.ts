import { CSSProperties } from 'react';

export declare type ToastType = 'success' | 'error' | 'loading' | 'blank' | 'custom';
export declare type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';
export declare type Renderable = JSX.Element | string | null;

export interface Toast {
  type: ToastType;
  id?: string;
  message: string;
  icon?: Renderable;
  duration?: number;
  pauseDuration?: number;
  position?: ToastPosition;
  ariaProps?: {
    role: 'status' | 'alert';
    'aria-live': 'assertive' | 'off' | 'polite';
  };
  style?: CSSProperties;
  className?: string;
  createdAt?: number;
  visible?: boolean;
  height?: number;
}
export declare type ToastOptions = Partial<
  Pick<Toast, 'id' | 'icon' | 'duration' | 'ariaProps' | 'className' | 'style' | 'position'>
>;
export declare type DefaultToastOptions = ToastOptions & {
  [key in ToastType]?: ToastOptions;
};
export interface ToasterProps {
  position?: ToastPosition;
  toastOptions?: DefaultToastOptions;
  reverseOrder?: boolean;
  gutter?: number;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
  children?: (toast: Toast) => JSX.Element;
}
