import React from 'react';
import { Flex, View, Heading, Button } from '@adobe/react-spectrum';

function Navbar() {
  return (
    <View backgroundColor="gray-200" padding="size-200">
      <Flex direction="row" alignItems="center" justifyContent="space-between">
        <Heading level={3}>To-Do List</Heading>
        <Flex direction="row" gap="size-100">
          <Button variant="primary">Home</Button>
          <Button variant="primary">Tasks</Button>
          <Button variant="primary">About</Button>
        </Flex>
      </Flex>
    </View>
  );
}

export default Navbar;
