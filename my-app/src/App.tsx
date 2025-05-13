import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { DndContext, DragEndEvent, DragOverlay, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import ElementPanel from './components/ElementPanel';
import BuilderCanvas from './components/BuilderCanvas';
import PropertyPanel from './components/PropertyPanel';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  border-bottom: 1px solid #dee2e6;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
`;

interface ViewToggleProps {
  $isViewMode: boolean;
}

const ViewToggle = styled.button<ViewToggleProps>`
  padding: 0.5rem 1rem;
  background-color: ${props => props.$isViewMode ? '#28a745' : '#007bff'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.$isViewMode ? '#218838' : '#0056b3'};
  }
`;

const BuilderContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const PreviewContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: #fff;
`;

interface Element {
  id: string;
  type: string;
  properties: {
    content?: string;
    level?: number;
    backgroundColor?: string;
    textColor?: string;
    height?: string;
    src?: string;
    alt?: string;
    title?: string;
    description?: string;
    submitText?: string;
    fields?: Array<{ type: string; label: string; placeholder?: string; required?: boolean }>;
    links?: Array<{ platform: string; url: string }>;
    embedUrl?: string;
    color?: string;
    text?: string;
  };
}

const getDefaultProperties = (type: string): Partial<Element['properties']> => {
  switch (type) {
    case 'text':
      return { content: 'New text block' };
    case 'heading':
      return { content: 'New heading', level: 2 };
    case 'image':
      return { src: 'https://via.placeholder.com/300x200', alt: 'Placeholder image' };
    case 'button':
      return { text: 'Click me', backgroundColor: '#007bff', textColor: 'white' };
    case 'divider':
      return { color: '#dee2e6' };
    case 'spacer':
      return { height: '20px' };
    case 'video':
      return { src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' };
    case 'form':
      return {
        title: 'Contact Form',
        description: 'Fill out the form below to get in touch.',
        submitText: 'Submit',
        fields: [
          { type: 'text', label: 'Name', placeholder: 'Enter your name', required: true },
          { type: 'email', label: 'Email', placeholder: 'Enter your email', required: true },
          { type: 'textarea', label: 'Message', placeholder: 'Enter your message', required: true }
        ]
      };
    case 'social':
      return {
        links: [
          { platform: 'Facebook', url: '#' },
          { platform: 'Twitter', url: '#' },
          { platform: 'Instagram', url: '#' }
        ]
      };
    case 'map':
      return { embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304903!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645564750981!5m2!1sen!2s' };
    default:
      return {};
  }
};

const App: React.FC = () => {
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isViewMode, setIsViewMode] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    // If dropping from panel to canvas
    if (typeof active.id === 'string' && active.id.startsWith('panel-')) {
      const elementType = active.id.replace('panel-', '');
      const newElement: Element = {
        id: `${elementType}-${Date.now()}`,
        type: elementType,
        properties: getDefaultProperties(elementType) as Element['properties']
      };

      setElements(prev => [...prev, newElement]);
      setSelectedElement(newElement.id);
    } 
    // If reordering within canvas
    else if (active.id !== over.id) {
      setElements(prev => {
        const oldIndex = prev.findIndex(e => e.id === active.id);
        const newIndex = prev.findIndex(e => e.id === over.id);
        
        if (oldIndex === -1 || newIndex === -1) return prev;
        
        return arrayMove(prev, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }, []);

  const handleDragStart = useCallback((event: DragEndEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleElementUpdate = useCallback((id: string, properties: Partial<Element['properties']>) => {
    setElements(prev => {
      if (!Array.isArray(prev)) return prev;
      return prev.map(element => 
        element?.id === id ? { ...element, properties: { ...element.properties, ...properties } } : element
      );
    });
  }, []);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <AppContainer>
        <Header>
          <Title>Website Builder</Title>
          <ViewToggle 
            $isViewMode={isViewMode}
            onClick={() => setIsViewMode(!isViewMode)}
          >
            {isViewMode ? 'Edit Site' : 'View Site'}
          </ViewToggle>
        </Header>
        
        {isViewMode ? (
          <PreviewContainer>
            <BuilderCanvas
              elements={elements}
              setElements={setElements}
              selectedElement={selectedElement}
              setSelectedElement={setSelectedElement}
              isPreview={true}
            />
          </PreviewContainer>
        ) : (
          <BuilderContainer>
            <ElementPanel />
            <BuilderCanvas
              elements={elements}
              setElements={setElements}
              selectedElement={selectedElement}
              setSelectedElement={setSelectedElement}
              isPreview={false}
            />
            {selectedElement && (
              <PropertyPanel
                element={elements.find(e => e?.id === selectedElement)}
                onUpdate={(properties) => handleElementUpdate(selectedElement, properties)}
              />
            )}
          </BuilderContainer>
        )}
      </AppContainer>
    </DndContext>
  );
};

export default App; 