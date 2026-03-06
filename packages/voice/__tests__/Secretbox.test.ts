import { Buffer } from 'node:buffer';
import { test, expect } from 'vitest';
import { methods, secretboxLoadPromise } from '../src/util/Secretbox';

/**
 * Test encrypt/decrypt round-trips successfully; note that Secretbox has multiple backend implementations depending on what libraries are available in the environment, this only tests one.
 */
test('crypto_aead_xchacha20poly1305_ietf_encrypt and _decrypt round-trips successfully', async () => {
	await secretboxLoadPromise;

	const key = Buffer.alloc(32, 1);
	const nonce = Buffer.alloc(24, 2);
	const aad = Buffer.from('additional data');
	const plaintext = Buffer.from('hello world');

	const encrypted = methods.crypto_aead_xchacha20poly1305_ietf_encrypt(plaintext, aad, nonce, key);
	const decrypted = methods.crypto_aead_xchacha20poly1305_ietf_decrypt(Buffer.from(encrypted), aad, nonce, key);

	// Expect round-trip to recover the original plaintext
	expect(Buffer.from(decrypted).equals(plaintext)).toBe(true);
});
