from Crypto.Cipher import AES
import base64

key = b'1234567890123456'

def encrypt(data):
    cipher = AES.new(key, AES.MODE_EAX)
    ciphertext, tag = cipher.encrypt_and_digest(data.encode())
    return base64.b64encode(ciphertext).decode()

def decrypt(ciphertext):
    cipher = AES.new(key, AES.MODE_EAX)
    return cipher.decrypt(base64.b64decode(ciphertext)).decode()