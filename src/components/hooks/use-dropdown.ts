import React, {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export interface UseDropdownOptions {
  onClose?: () => void;
}

export interface UseDropdownReturn {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
  containerRef: RefObject<HTMLDivElement | null>;
  menuRef: RefObject<HTMLDivElement | null>;
  buttonRef: RefObject<HTMLButtonElement | null>;
  handleButtonKeyDown: (e: React.KeyboardEvent) => void;
  handleMenuKeyDown: (e: React.KeyboardEvent) => void;
}

function getMenuLinks(menuRef: RefObject<HTMLDivElement | null>) {
  return Array.from(menuRef.current?.querySelectorAll("a") ?? []);
}

function focusMenuItemByOffset(
  menuRef: RefObject<HTMLDivElement | null>,
  offset: number
) {
  const links = getMenuLinks(menuRef);
  const currentIndex = links.indexOf(
    document.activeElement as HTMLAnchorElement
  );
  const nextIndex =
    offset > 0
      ? (currentIndex + 1) % links.length
      : (currentIndex - 1 + links.length) % links.length;
  links[nextIndex]?.focus();
}

export function useDropdown(
  options: UseDropdownOptions = {}
): UseDropdownReturn {
  const { onClose } = options;
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const open = useCallback(() => {
    setIsOpen(true);
    setTimeout(() => {
      const firstLink = menuRef.current?.querySelector("a");
      firstLink?.focus();
    }, 0);
  }, []);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, close, open]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        close();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, close]);

  const handleButtonKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (isOpen) {
        if (e.key === "Escape") {
          e.preventDefault();
          close();
          buttonRef.current?.focus();
          return;
        }
        if (e.key === "ArrowDown") {
          e.preventDefault();
          focusMenuItemByOffset(menuRef, 1);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          focusMenuItemByOffset(menuRef, -1);
        }
      } else if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    },
    [isOpen, close, open]
  );

  const handleMenuKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        buttonRef.current?.focus();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        focusMenuItemByOffset(menuRef, 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        focusMenuItemByOffset(menuRef, -1);
      }
    },
    [close]
  );

  return {
    isOpen,
    toggle,
    close,
    open,
    containerRef,
    menuRef,
    buttonRef,
    handleButtonKeyDown,
    handleMenuKeyDown,
  };
}
