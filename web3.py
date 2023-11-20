from web3 import Web3

# Connecting to a local Ethereum node (replace 'http://127.0.0.1:8545' with your node's URL)
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))

def get_block_number():
    return w3.eth.block_number

def get_balance(address):
    return w3.eth.get_balance(address)

def get_transaction_count(address):
    return w3.eth.get_transaction_count(address)

def send_transaction(private_key, to_address, value):
    # Example code for sending Ether, handle gas, and other parameters appropriately
    transaction = {
        'to': to_address,
        'value': w3.toWei(value, 'ether'),
        'gas': 2000000,
        'gasPrice': w3.toWei('50', 'gwei'),
        'nonce': w3.eth.getTransactionCount(w3.eth.coinbase),
    }
    signed_tx = w3.eth.account.signTransaction(transaction, private_key)
    tx_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
    return tx_hash.hex()

# Example usage
if __name__ == "__main__":
    block_number = get_block_number()
    print(f"Current block number: {block_number}")

    balance = get_balance('0xYourAddressHere')
    print(f"Balance of address: {balance} wei")

    transaction_count = get_transaction_count('0xYourAddressHere')
    print(f"Transaction count: {transaction_count}")

    # Replace the following with appropriate private key and destination address
    private_key = 'YourPrivateKeyHere'
    to_address = '0xRecipientAddressHere'
    value_to_send = 0.1  # Ether

    tx_hash = send_transaction(private_key, to_address, value_to_send)
    print(f"Transaction sent. Transaction hash: {tx_hash}")
