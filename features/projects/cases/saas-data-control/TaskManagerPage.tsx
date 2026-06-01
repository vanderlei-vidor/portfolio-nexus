import { Hero } from "./sections/Hero/Hero";
import { DashboardAnalytics } from "./sections/DashboardAnalytics/DashboardAnalytics";


import "./TaskManagerPage.css";
import { EnterpriseArchitecture } from "./sections/EnterpriseArchitecture/EnterpriseArchitecture";
import { OperationalChallenge } from "./sections/OperationalChallenge/OperationalChallenge";
import { CentralizedSolution } from "./sections/CentralizedSolution/CentralizedSolution";
import { CorporateFeatures } from "./sections/CorporateFeatures/CorporateFeatures";
import { TechStack } from "./sections/TechStack/TechStack";

import FinalShowcasee from "./sections/FinalShowcase/FinalShowcasee";

export function TaskManagerPage() {
  return (
    <main className="task-manager-page">

      <Hero />

      <DashboardAnalytics />

      <EnterpriseArchitecture />

      <OperationalChallenge />

      <CentralizedSolution />

      <CorporateFeatures />

      <TechStack />

      <FinalShowcasee />

     

    </main>
  );
}