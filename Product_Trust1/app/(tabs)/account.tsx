import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Account() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Account</Text>
      </View>
      
      <View style={styles.section}>
        <Pressable style={styles.menuItem}>
          <Ionicons name="person-outline" size={24} color="#333" />
          <Text style={styles.menuText}>Profile</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </Pressable>
        
        <Pressable style={styles.menuItem}>
          <Ionicons name="bag-outline" size={24} color="#333" />
          <Text style={styles.menuText}>My Orders</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </Pressable>
        
        <Pressable style={styles.menuItem}>
          <Ionicons name="heart-outline" size={24} color="#333" />
          <Text style={styles.menuText}>Wishlist</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </Pressable>
      </View>

      <View style={styles.section}>
        <Pressable style={styles.menuItem}>
          <Ionicons name="settings-outline" size={24} color="#333" />
          <Text style={styles.menuText}>Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </Pressable>
        
        <Pressable style={styles.menuItem}>
          <Ionicons name="help-circle-outline" size={24} color="#333" />
          <Text style={styles.menuText}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </Pressable>
      </View>

      <View style={styles.section}>
        <Pressable style={[styles.menuItem, styles.logoutButton]}>
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#FF3B30',
  },
});
