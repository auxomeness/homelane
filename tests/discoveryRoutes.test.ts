import assert from 'node:assert/strict';
import test from 'node:test';
import { discoveryPaths, getDiscoveryPath } from '../src/discovery/shared/discoveryRoutes.ts';

test('discovery routes include the connected list and map destinations', () => {
  assert.equal(discoveryPaths.properties, '/discovery/properties');
  assert.equal(discoveryPaths.map, '/discovery/map');
});

test('list and map navigation preserve all browsing and selected-listing query state', () => {
  const search = '?q=condo&type=Condo&min=1000000&max=3000000&radius=5&selected=listing-42';
  assert.equal(getDiscoveryPath('map', search), `/discovery/map${search}`);
  assert.equal(getDiscoveryPath('properties', search), `/discovery/properties${search}`);
});

test('non-browsing discovery navigation does not carry stale property filters', () => {
  const search = '?q=condo&type=Condo&selected=listing-42';
  assert.equal(getDiscoveryPath('messages', search), '/discovery/messages');
  assert.equal(getDiscoveryPath('notifications', search), '/discovery/notifications');
});

test('browsing navigation works without query parameters', () => {
  assert.equal(getDiscoveryPath('map'), '/discovery/map');
  assert.equal(getDiscoveryPath('properties'), '/discovery/properties');
});
