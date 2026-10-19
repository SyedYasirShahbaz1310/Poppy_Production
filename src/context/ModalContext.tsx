"use client";

import React, { createContext, useContext, useState } from "react";
import ShowreelModal from "@/components/ShowreelModal";
import SearchModal from "@/components/SearchModal";
import CurtainMenu from "@/components/CurtainMenu";
import ProjectModal from "@/components/ProjectModal";
import { Project } from "@/types";

interface ModalContextType {
  openShowreel: () => void;
  closeShowreel: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  openProject: (project: Project) => void;
  closeProject: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <ModalContext.Provider
      value={{
        openShowreel: () => setShowreelOpen(true),
        closeShowreel: () => setShowreelOpen(false),
        openSearch: () => setSearchOpen(true),
        closeSearch: () => setSearchOpen(false),
        openMenu: () => setMenuOpen(true),
        closeMenu: () => setMenuOpen(false),
        openProject: (p) => setSelectedProject(p),
        closeProject: () => setSelectedProject(null),
      }}
    >
      {children}

      {/* Global Modals Mounted at Root */}
      <ShowreelModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProject={(p) => setSelectedProject(p)}
      />

      <CurtainMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpenSearch={() => {
          setMenuOpen(false);
          setSearchOpen(true);
        }}
        onOpenShowreel={() => setShowreelOpen(true)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
