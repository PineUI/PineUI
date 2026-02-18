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
import { CollectionMap } from '../components/CollectionMap';
import { Scaffold } from '../components/Scaffold';
import { AppBar } from '../components/AppBar';
import { BottomNav } from '../components/BottomNav';
import { Input } from '../components/Input';
import { Divider } from '../components/Divider';
import { ConditionalRender } from '../components/ConditionalRender';
import { ConditionalMap } from '../components/ConditionalMap';
import { Tabs } from '../components/Tabs';
import { Badge } from '../components/Badge';
import { Chip } from '../components/Chip';
import { Grid } from '../components/Grid';
import { Progress } from '../components/Progress';
import { Table } from '../components/Table';
import { View } from '../components/View';

const COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
  'text': Text,
  'button.filled': Button,
  'button.text': Button,
  'button.outlined': Button,
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
  'collection.map': CollectionMap,
  'input.text': Input,
  'input.email': Input,
  'input.password': Input,
  'input.number': Input,
  'input.search': Input,
  'divider': Divider,
  'conditionalRender': ConditionalRender,
  'conditional.render': ConditionalMap,
  'tabs': Tabs,
  'badge': Badge,
  'chip': Chip,
  'grid': Grid,
  'progress': Progress,
  'table': Table,
  'view': View,
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

  // Build binding context with item from parentData
  const bindingContext: any = parentData !== undefined
    ? Object.assign({}, context, { item: parentData })
    : context;

  // IMPORTANT: For Collection and CollectionMap, don't resolve bindings here.
  // - Collection handles item data directly
  // - CollectionMap resolves its own `data` binding internally so that
  //   `template` is passed raw and item.* expressions work correctly per-item.
  const shouldResolveBindings = node.type !== 'collection' && node.type !== 'collection.map';

  const resolvedNode = shouldResolveBindings
    ? resolveBindings(node, bindingContext)
    : node;

  // Check if it's a component reference
  if (resolvedNode.type.startsWith('component.')) {
    const componentName = resolvedNode.type;
    const component = context.components[componentName];

    if (!component) {
      console.warn(`Component not found: ${componentName}`);
      return null;
    }

    // Render component definition with enhanced context
    // IMPORTANT: Use bindingContext (which has item) instead of context
    const componentContext = {
      ...bindingContext,
      props: resolvedNode.props,
    };

    return <Renderer node={component.definition} context={componentContext} parentData={parentData} />;
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
