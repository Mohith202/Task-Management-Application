import React from 'react';
import { Flex, View, Heading, Button } from '@adobe/react-spectrum';

function Navbar() {
  return (
    <View backgroundColor="gray-200" padding="size-200">
      <Flex direction="row" alignItems="center" width="100%" justifyContent="space-between">
        <Heading level={2} UNSAFE_style={{fontSize:"2rem",paddingBottom:"1vh",margin:"auto"}} >To-Do List</Heading>
        
      </Flex>
    </View>
  );
}

export default Navbar;
