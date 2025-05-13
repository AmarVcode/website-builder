import React from 'react';
import styled from 'styled-components';

const Panel = styled.div`
  width: 300px;
  background-color: #f8f9fa;
  border-left: 1px solid #dee2e6;
  padding: 20px;
  overflow-y: auto;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  margin-bottom: 10px;
  min-height: 100px;
`;

const ColorInput = styled.input`
  width: 50px;
  height: 30px;
  padding: 0;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  margin-bottom: 10px;
`;

interface PropertyPanelProps {
  element: any;
  onUpdate: (properties: any) => void;
}

const PropertyPanel: React.FC<PropertyPanelProps> = ({ element, onUpdate }) => {
  if (!element) return null;

  const handleChange = (property: string, value: any) => {
    onUpdate({ [property]: value });
  };

  const renderProperties = () => {
    switch (element.type) {
      case 'text':
        return (
          <Section>
            <Label>Content</Label>
            <TextArea
              value={element.content}
              onChange={(e) => handleChange('content', e.target.value)}
            />
          </Section>
        );
      case 'heading':
        return (
          <Section>
            <Label>Content</Label>
            <Input
              type="text"
              value={element.content}
              onChange={(e) => handleChange('content', e.target.value)}
            />
          </Section>
        );
      case 'image':
        return (
          <>
            <Section>
              <Label>Image URL</Label>
              <Input
                type="text"
                value={element.src}
                onChange={(e) => handleChange('src', e.target.value)}
              />
            </Section>
            <Section>
              <Label>Alt Text</Label>
              <Input
                type="text"
                value={element.alt}
                onChange={(e) => handleChange('alt', e.target.value)}
              />
            </Section>
          </>
        );
      case 'button':
        return (
          <>
            <Section>
              <Label>Text</Label>
              <Input
                type="text"
                value={element.text}
                onChange={(e) => handleChange('text', e.target.value)}
              />
            </Section>
            <Section>
              <Label>Background Color</Label>
              <ColorInput
                type="color"
                value={element.backgroundColor}
                onChange={(e) => handleChange('backgroundColor', e.target.value)}
              />
            </Section>
            <Section>
              <Label>Text Color</Label>
              <ColorInput
                type="color"
                value={element.color}
                onChange={(e) => handleChange('color', e.target.value)}
              />
            </Section>
          </>
        );
      case 'divider':
        return (
          <Section>
            <Label>Color</Label>
            <ColorInput
              type="color"
              value={element.color}
              onChange={(e) => handleChange('color', e.target.value)}
            />
          </Section>
        );
      case 'spacer':
        return (
          <Section>
            <Label>Height (px)</Label>
            <Input
              type="number"
              value={parseInt(element.height)}
              onChange={(e) => handleChange('height', `${e.target.value}px`)}
            />
          </Section>
        );
      case 'video':
        return (
          <Section>
            <Label>Video URL</Label>
            <Input
              type="text"
              value={element.url}
              onChange={(e) => handleChange('url', e.target.value)}
            />
          </Section>
        );
      case 'form':
        return (
          <Section>
            <Label>Form Fields</Label>
            {element.fields.map((field: any, index: number) => (
              <div key={index}>
                <Input
                  type="text"
                  value={field.label}
                  onChange={(e) => {
                    const newFields = [...element.fields];
                    newFields[index] = { ...field, label: e.target.value };
                    handleChange('fields', newFields);
                  }}
                  placeholder="Field Label"
                />
              </div>
            ))}
          </Section>
        );
      case 'social':
        return (
          <Section>
            <Label>Social Links</Label>
            {element.links.map((link: any, index: number) => (
              <div key={index}>
                <Input
                  type="text"
                  value={link.platform}
                  onChange={(e) => {
                    const newLinks = [...element.links];
                    newLinks[index] = { ...link, platform: e.target.value };
                    handleChange('links', newLinks);
                  }}
                  placeholder="Platform Name"
                />
                <Input
                  type="text"
                  value={link.url}
                  onChange={(e) => {
                    const newLinks = [...element.links];
                    newLinks[index] = { ...link, url: e.target.value };
                    handleChange('links', newLinks);
                  }}
                  placeholder="URL"
                />
              </div>
            ))}
          </Section>
        );
      case 'map':
        return (
          <>
            <Section>
              <Label>Location</Label>
              <Input
                type="text"
                value={element.location}
                onChange={(e) => handleChange('location', e.target.value)}
              />
            </Section>
            <Section>
              <Label>Zoom Level</Label>
              <Input
                type="number"
                min="1"
                max="20"
                value={element.zoom}
                onChange={(e) => handleChange('zoom', parseInt(e.target.value))}
              />
            </Section>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Panel>
      <h3>Properties</h3>
      {renderProperties()}
    </Panel>
  );
};

export default PropertyPanel; 