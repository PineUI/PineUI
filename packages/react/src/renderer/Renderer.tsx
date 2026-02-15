import React from 'react';
import { ComponentNode, RenderContext } from '../types';
import { resolveBindings } from './bindings';

// Component registry
import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Image } from '../components/Image';
import { Avatar } from '../components/Avatar';
import { Icon } from '../components/Icon';
import { Collection } from '../components/Collection';
import { Scaffold } from '../components/Scaffold';
import { AppBar } from '../components/AppBar';
import { BottomNav } from '../components/BottomNav';
import { Input } from '../components/Input';
import { Divider } from '../components/Divider';
import { ConditionalRender } from '../components/ConditionalRender';

const COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
  'text': Text,
  'button.filled': Button,
  'button.text': Button,
  'button.icon': Button,
  'button.fab': Button,
  'layout.column': Layout,
  'layout.row': Layout,
  'layout.scaffold': Scaffold,
  'layout.appBar': AppBar,
  'layout.bottomNav': BottomNav,
  'card': Card,
  'image': Image,
  'avatar': Avatar,
  'icon': Icon,
  'collection': Collection,
  'input.text': Input,
  'divider': Divider,
  'conditionalRender': ConditionalRender,
};

export interface RendererProps {
  node: ComponentNode;
  context: RenderContext;
  parentData?: any;
}

export const Renderer: React.FC<RendererProps> = ({ node, context, parentData }) => {
  if (!node || !node.type) {
    return null;
  }

  // Resolve bindings in the node
  const resolvedNode = resolveBindings(node, {
    ...context,
    item: parentData,
    props: { ...node.props, ...parentData },
  });

  // Check if it's a pattern reference
  if (resolvedNode.type.startsWith('pattern.')) {
    const patternName = resolvedNode.type;
    const pattern = context.patterns[patternName];

    if (!pattern) {
      console.warn(`Pattern not found: ${patternName}`);
      return null;
    }

    // Render pattern definition with props
    const patternContext = {
      ...context,
      props: { ...resolvedNode.props, ...parentData },
    };

    return <Renderer node={pattern.definition} context={patternContext} parentData={parentData} />;
  }

  // Get component from registry
  const Component = COMPONENT_MAP[resolvedNode.type];

  if (!Component) {
    console.warn(`Unknown component type: ${resolvedNode.type}`);
    return null;
  }

  // Pass context and render props
  return (
    <Component
      {...resolvedNode}
      context={context}
      renderer={Renderer}
    />
  );
};
