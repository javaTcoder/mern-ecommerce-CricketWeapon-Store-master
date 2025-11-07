import { Stack } from 'expo-router';

export default function ModalLayout() {
  // All screens in this folder will be presented with modal style
  return <Stack screenOptions={{ presentation: 'modal' }} />;
}
