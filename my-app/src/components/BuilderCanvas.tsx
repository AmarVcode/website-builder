import React from 'react';
import styled from 'styled-components';
import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const CanvasContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
  overflow-y: auto;
`;

const Canvas = styled.div<{ $isOver?: boolean; $isPreview?: boolean }>`
  background-color: ${props => props.$isOver ? '#f0f0f0' : props.$isPreview ? '#f0f0f0' : 'white'};
  border: 1px solid #dee2e6;
  border-radius: 4px;
  min-height: 100%;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  transition: background-color 0.2s;
`;

const TextElement = styled.div<{ $isSelected: boolean }>`
  padding: 10px;
  margin: 5px 0;
  border: 2px solid ${props => props.$isSelected ? '#2196f3' : 'transparent'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: white;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const HeadingElement = styled.h2<{ $isSelected: boolean }>`
  padding: 10px;
  margin: 5px 0;
  border: 2px solid ${props => props.$isSelected ? '#2196f3' : 'transparent'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: white;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const ImageElement = styled.img<{ $isSelected: boolean }>`
  max-width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 2px solid ${props => props.$isSelected ? '#2196f3' : 'transparent'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: white;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const ButtonElement = styled.button<{ $isSelected: boolean; $backgroundColor?: string; $textColor?: string }>`
  padding: 10px 20px;
  margin: 5px 0;
  border: 2px solid ${props => props.$isSelected ? '#2196f3' : 'transparent'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${props => props.$backgroundColor || '#007bff'};
  color: ${props => props.$textColor || 'white'};
  border: none;

  &:hover {
    opacity: 0.9;
  }
`;

const DividerElement = styled.hr<{ $isSelected: boolean; $color?: string }>`
  width: 100%;
  border: none;
  border-top: 1px solid ${props => props.$color || '#dee2e6'};
  margin: 10px 0;
  padding: 10px;
  border: 2px solid ${props => props.$isSelected ? '#2196f3' : 'transparent'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: white;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const SpacerElement = styled.div<{ $isSelected: boolean; $height?: string }>`
  height: ${props => props.$height || '20px'};
  padding: 10px;
  margin: 5px 0;
  border: 2px solid ${props => props.$isSelected ? '#2196f3' : 'transparent'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: white;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const VideoElement = styled.video<{ $isSelected: boolean }>`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 2px solid ${props => props.$isSelected ? '#2196f3' : 'transparent'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: white;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const FormElement = styled.div<{ $isSelected: boolean }>`
  padding: 20px;
  margin: 5px 0;
  border: 2px solid ${props => props.$isSelected ? '#2196f3' : 'transparent'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: white;

  &:hover {
    background-color: #f8f9fa;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  input {
    padding: 8px;
    border: 1px solid #dee2e6;
    border-radius: 4px;
  }

  button {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const SocialElement = styled.div<{ $isSelected: boolean }>`
  padding: 20px;
  margin: 5px 0;
  border: 2px solid ${props => props.$isSelected ? '#2196f3' : 'transparent'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: white;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  &:hover {
    background-color: #f8f9fa;
  }

  a {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 4px;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const MapElement = styled.iframe<{ $isSelected: boolean }>`
  width: 100%;
  height: 400px;
  padding: 10px;
  margin: 5px 0;
  border: 2px solid ${props => props.$isSelected ? '#2196f3' : 'transparent'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: white;

  &:hover {
    background-color: #f8f9fa;
  }
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

interface BuilderCanvasProps {
  elements: Element[];
  setElements: (elements: Element[]) => void;
  selectedElement: string | null;
  setSelectedElement: (id: string | null) => void;
  isPreview?: boolean;
}

const BuilderCanvas: React.FC<BuilderCanvasProps> = ({
  elements,
  setElements,
  selectedElement,
  setSelectedElement,
  isPreview = false
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas',
    data: {
      accepts: ['panel-text', 'panel-heading', 'panel-image', 'panel-button', 'panel-divider', 'panel-spacer', 'panel-video', 'panel-form', 'panel-social', 'panel-map']
    }
  });

  const handleElementClick = (id: string) => {
    if (!isPreview) {
      setSelectedElement(id === selectedElement ? null : id);
    }
  };

  const renderElement = (element: Element): React.ReactNode => {
    if (!element || !element.id) return null;

    const SortableElement = ({ element }: { element: Element }) => {
      const {
        attributes,
        listeners,
        setNodeRef: setSortableRef,
        transform,
        transition,
        isDragging
      } = useSortable({
        id: element.id,
        disabled: isPreview
      });

      const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        cursor: isPreview ? 'default' : 'move'
      };

      const commonProps = {
        ref: setSortableRef,
        style,
        onClick: () => handleElementClick(element.id),
        ...(!isPreview && { ...attributes, ...listeners })
      };

      switch (element.type) {
        case 'text':
          return (
            <TextElement
              {...commonProps}
              $isSelected={element.id === selectedElement && !isPreview}
              dangerouslySetInnerHTML={{ __html: element.properties.content || '' }}
            />
          );
        case 'heading':
          return (
            <HeadingElement
              {...commonProps}
              $isSelected={element.id === selectedElement && !isPreview}
              as={`h${element.properties.level || 2}`}
            >
              {element.properties.content}
            </HeadingElement>
          );
        case 'image':
          return (
            <ImageElement
              {...commonProps}
              $isSelected={element.id === selectedElement && !isPreview}
              src={element.properties.src}
              alt={element.properties.alt}
            />
          );
        case 'button':
          return (
            <ButtonElement
              {...commonProps}
              $isSelected={element.id === selectedElement && !isPreview}
              $backgroundColor={element.properties.backgroundColor}
              $textColor={element.properties.textColor}
            >
              {element.properties.text}
            </ButtonElement>
          );
        case 'divider':
          return (
            <DividerElement
              {...commonProps}
              $isSelected={element.id === selectedElement && !isPreview}
              $color={element.properties.color}
            />
          );
        case 'spacer':
          return (
            <SpacerElement
              {...commonProps}
              $isSelected={element.id === selectedElement && !isPreview}
              $height={element.properties.height}
            />
          );
        case 'video':
          return (
            <VideoElement
              {...commonProps}
              $isSelected={element.id === selectedElement && !isPreview}
              src={element.properties.src}
              controls
            />
          );
        case 'form':
          return (
            <FormElement
              {...commonProps}
              $isSelected={element.id === selectedElement && !isPreview}
            >
              <h3>{element.properties.title}</h3>
              <p>{element.properties.description}</p>
              <form>
                {element.properties.fields?.map((field, index) => (
                  <div key={index}>
                    <label>{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  </div>
                ))}
                <button type="submit">{element.properties.submitText}</button>
              </form>
            </FormElement>
          );
        case 'social':
          return (
            <SocialElement
              {...commonProps}
              $isSelected={element.id === selectedElement && !isPreview}
            >
              {element.properties.links?.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.platform}
                </a>
              ))}
            </SocialElement>
          );
        case 'map':
          return (
            <MapElement
              {...commonProps}
              $isSelected={element.id === selectedElement && !isPreview}
              src={element.properties.embedUrl}
              allowFullScreen
            />
          );
        default:
          return null;
      }
    };

    return <SortableElement element={element} />;
  };

  return (
    <CanvasContainer>
      <Canvas 
        ref={setNodeRef} 
        $isOver={isOver && !isPreview}
        $isPreview={isPreview}
      >
        {elements && elements.length > 0 ? (
          elements.map((element) => {
            if (!element || !element.id) return null;
            return renderElement(element);
          })
        ) : (
          !isPreview && (
            <div style={{ textAlign: 'center', color: '#6c757d', padding: '20px' }}>
              Drag elements here to build your page
            </div>
          )
        )}
      </Canvas>
    </CanvasContainer>
  );
};

export default BuilderCanvas; 