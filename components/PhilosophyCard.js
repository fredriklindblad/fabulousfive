import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGlobalStyles } from '@/globalStyles';

const screenWidth = Dimensions.get('window').width;
const squareSize = screenWidth * 0.5;

export default function PhilosophyCard({
  title,
  text,
  image,
  variant = 'topRight',
  modalContent,
}) {
  const { colors } = useGlobalStyles();
  const [modalVisible, setModalVisible] = useState(false);

  const renderImage = () => {
    if (!image) return null;

    switch (variant) {
      case 'topRight':
        return (
          <Image
            source={{ uri: image }}
            style={styles.imageTopRight}
          />
        );
      case 'halfHalf':
        return (
          <Image
            source={{ uri: image }}
            style={styles.imageHalf}
          />
        );
      case 'full':
        return (
          <Image
            source={{ uri: image }}
            style={styles.imageFull}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <View style={[
        styles.card,
        {
          backgroundColor: colors.philosophyBackground,
          borderColor: colors.philosophyBorder,
          shadowColor: colors.cardShadow,
        },
      ]}>
        {renderImage()}
        <View style={{ padding: 16 }}>
          <Text style={[styles.title, { color: colors.primaryText, textAlign: 'center' }]}>
            {title}
          </Text>
          <Text style={[styles.text, { color: colors.secondaryText }]}>
            {text}
          </Text>
        </View>

        {modalContent && (
          <TouchableOpacity style={styles.infoIcon} onPress={() => setModalVisible(true)}>
            <Ionicons name="information-circle-outline" size={24} color={colors.primaryText} />
          </TouchableOpacity>
        )}
      </View>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.modalTitle, { color: colors.primaryText }]}>{title}</Text>
            <Text style={[styles.modalText, { color: colors.secondaryText }]}>{modalContent}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Stäng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    width: squareSize,
    height: squareSize,
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontFamily: 'LatoBold',
    marginBottom: 8,
  },
  text: {
    fontSize: 13,
    fontFamily: 'Lato',
    lineHeight: 19,
  },
  imageTopRight: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 80,
    height: 80,
    borderRadius: 16,
  },
  imageHalf: {
    width: '100%',
    height: 150,
  },
  imageFull: {
    width: '100%',
    height: 200,
  },
  infoIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    borderRadius: 20,
    padding: 24,
    maxWidth: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'LatoBold',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'Lato',
    lineHeight: 22,
    marginBottom: 24,
  },
  closeButton: {
    backgroundColor: '#DBBEC0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: '600',
  },
});
