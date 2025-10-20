import { useState } from 'react';
import { Text, View, TouchableOpacity, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

interface BottomButtonProps {
  value: string;
  pressed: boolean;
  onPress: () => void;
  style?: ViewStyle;
  disable?: boolean;
}

const BottomButton = ({
  value,
  pressed,
  onPress,
  style,
  disable,
}: BottomButtonProps) => {
  return (
    <ButtonContainer
      pressed={pressed}
      onPress={onPress}
      style={{ ...style }}
      disabled={disable}>
      <Text style={{ color: pressed ? 'black' : 'black' }}>{value}</Text>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity<{
  pressed: boolean;
  disabled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 10px 90px;
  background-color: ${(props: { pressed: boolean }) =>
    props.pressed ? 'white' : '#FCA0BF'};
  ${(props: { disabled: boolean }) => props.disabled && 'opacity: 0.1;'};
`;

export default BottomButton;
