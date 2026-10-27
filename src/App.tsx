/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LanguageProvider } from './i18n';
import { RouterProvider, useRouter } from './router';
import { FloatingWhatsApp, Footer, Header } from './components/Layout';
import { HomePage } from './components/HomeSections';
import { StayPage } from './components/StaySections';
import { ToursPage } from './components/ToursSections';
import { VisitPage } from './components/VisitSections';

function AppShell() {
  const { route } = useRouter();

  return (
    <>
      <Header />
      <main id="main" key={route} className="page-enter">
        {route === 'home' && <HomePage />}
        {route === 'stay' && <StayPage />}
        {route === 'tours' && <ToursPage />}
        {route === 'visit' && <VisitPage />}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider>
        <AppShell />
      </RouterProvider>
    </LanguageProvider>
  );
}
