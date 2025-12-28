import React from 'react';
import { View, Image, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, borderRadius } from '../../constants/theme';

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  name,
  size = 'md',
  style,
}) => {
  const getSize = (): number => {
    switch (size) {
      case 'sm':
        return 32;
      case 'md':
        return 48;
      case 'lg':
        return 64;
      case 'xl':
        return 96;
      default:
        return 48;
    }
  };

  const getFontSize = (): number => {
    switch (size) {
      case 'sm':
        return 12;
      case 'md':
        return 18;
      case 'lg':
        return 24;
      case 'xl':
        return 36;
      default:
        return 18;
    }
  };

  const getInitials = (): string => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const avatarSize = getSize();

  const containerStyle: ViewStyle = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
  };

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[styles.image, containerStyle, style]}
      />
    );
  }

  return (
    <View style={[styles.placeholder, containerStyle, style]}>
      <Text style={[styles.initials, { fontSize: getFontSize() }]}>
        {getInitials()}
      </Text>
    </View>
  );
};

interface CoupleAvatarsProps {
  partnerA?: { uri?: string; name?: string };
  partnerB?: { uri?: string; name?: string };
  size?: 'sm' | 'md' | 'lg' | 'xl';
  style?: ViewStyle;
}

export const CoupleAvatars: React.FC<CoupleAvatarsProps> = ({
  partnerA,
  partnerB,
  size = 'lg',
  style,
}) => {
  const getOverlap = (): number => {
    switch (size) {
      case 'sm':
        return -8;
      case 'md':
        return -12;
      case 'lg':
        return -16;
      case 'xl':
        return -24;
      default:
        return -12;
    }
  };

  return (
    <View style={[styles.coupleContainer, style]}>
      <Avatar
        uri={partnerA?.uri}
        name={partnerA?.name || 'Partner'}
        size={size}
        style={styles.avatarBorder}
      />
      <Avatar
        uri={partnerB?.uri}
        name={partnerB?.name || 'Partner'}
        size={size}
        style={[styles.avatarBorder, { marginLeft: getOverlap() }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
  },

  placeholder: {
    backgroundColor: colors.lavender,
    alignItems: 'center',
    justifyContent: 'center',
  },

  initials: {
    color: colors.primary,
    fontWeight: typography.fontWeight.semiBold,
  },

  coupleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatarBorder: {
    borderWidth: 3,
    borderColor: colors.card,
  },
});

export default Avatar;
