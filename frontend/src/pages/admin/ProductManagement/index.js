import React, { useState } from 'react';
import { Package, Truck, Clock, Archive } from 'lucide-react';
import { 
  Container,
  Sidebar,
  SidebarTitle,
  NavItem,
  MainContent,
  Header,
  HeaderTitle,
} from './styles';

import PhaseOne from './components/PhaseOne';
import PhaseTwo from './components/PhaseTwo';
import PhaseThree from './components/PhaseThree';
import PhaseFour from './components/PhaseFour';

const ProductManagement = () => {
  const [activePhase, setActivePhase] = useState('phase1');

  const phases = [
    {
      id: 'phase1',
      title: '團購中商品',
      icon: Package,
      component: PhaseOne
    },
    {
      id: 'phase2',
      title: '等待到貨商品',
      icon: Truck,
      component: PhaseTwo
    },
    {
      id: 'phase3',
      title: '取貨中商品',
      icon: Clock,
      component: PhaseThree
    },
    {
      id: 'phase4',
      title: '已完成商品',
      icon: Archive,
      component: PhaseFour
    }
  ];

  const currentPhase = phases.find(phase => phase.id === activePhase);
  const PhaseComponent = currentPhase?.component;

  return (
    <Container>
      <Sidebar>
        <SidebarTitle>商品管理系統</SidebarTitle>
        {phases.map(phase => {
          const Icon = phase.icon;
          return (
            <NavItem
              key={phase.id}
              active={activePhase === phase.id}
              onClick={() => setActivePhase(phase.id)}
            >
              <Icon size={20} />
              <span>{phase.title}</span>
            </NavItem>
          );
        })}
      </Sidebar>

      <MainContent>
        <Header>
          <HeaderTitle>{currentPhase?.title}</HeaderTitle>
        </Header>
        {PhaseComponent && <PhaseComponent />}
      </MainContent>
    </Container>
  );
};

export default ProductManagement;