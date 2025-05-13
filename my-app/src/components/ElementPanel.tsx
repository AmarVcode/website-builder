import React from 'react';
import styled from 'styled-components';
import { useDraggable } from '@dnd-kit/core';

const Panel = styled.div`
  width: 250px;
  background-color: #f8f9fa;
  border-right: 1px solid #dee2e6;
  padding: 20px;
  overflow-y: auto;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Item = styled.div<{ $isDragging?: boolean }>`
  padding: 10px;
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  cursor: grab;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.2s;
  opacity: ${props => props.$isDragging ? 0.8 : 1};
  user-select: none;

  &:hover {
    background-color: #f8f9fa;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    cursor: grabbing;
  }
`;

const Icon = styled.span`
  font-size: 20px;
  color: #6c757d;
`;

const elements = [
  { id: 'text', type: 'text', icon: '📝', label: 'Text Block' },
  { id: 'heading', type: 'heading', icon: '📌', label: 'Heading' },
  { id: 'image', type: 'image', icon: '🖼️', label: 'Image' },
  { id: 'button', type: 'button', icon: '🔘', label: 'Button' },
  { id: 'divider', type: 'divider', icon: '➖', label: 'Divider' },
  { id: 'spacer', type: 'spacer', icon: '↕️', label: 'Spacer' },
  { id: 'video', type: 'video', icon: '🎥', label: 'Video' },
  { id: 'form', type: 'form', icon: '📋', label: 'Form' },
  { id: 'social', type: 'social', icon: '🔗', label: 'Social Links' },
  { id: 'map', type: 'map', icon: '🗺️', label: 'Map' },
];

interface DraggableItemProps {
  element: typeof elements[0];
}

const DraggableItem: React.FC<DraggableItemProps> = ({ element }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `panel-${element.id}`,
    data: {
      type: element.type
    }
  });

  return (
    <Item
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      $isDragging={isDragging}
      data-type={element.type}
    >
      <Icon>{element.icon}</Icon>
      {element.label}
    </Item>
  );
};

const ElementPanel: React.FC = () => {
  return (
    <Panel>
      <List>
        {elements.map((element) => (
          <DraggableItem key={element.id} element={element} />
        ))}
      </List>
    </Panel>
  );
};

export default ElementPanel; 