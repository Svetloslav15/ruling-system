/**
 * @swagger
 * tags:
 *   name: Configurations
 *   description: API to manage transaction configurations.
 */

/**
 * @swagger
 * /configurations:
 *   post:
 *     summary: Create a new configuration
 *     tags: [Configurations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the configuration
 *                 example: "Monitor High Value Transactions"
 *               filter:
 *                 type: object
 *                 description: JSON object defining the transaction filter rules
 *                 properties:
 *                   from:
 *                     type: string
 *                     description: Ethereum address of the sender
 *                     example: "0x1234567890abcdef1234567890abcdef12345678"
 *                   to:
 *                     type: string
 *                     description: Ethereum address of the receiver
 *                     example: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef"
 *                   minValue:
 *                     type: string
 *                     description: Minimum value of the transaction (in Wei)
 *                     example: "1000000000000000000"  # 1 Ether in Wei
 *                   maxValue:
 *                     type: string
 *                     description: Maximum value of the transaction (in Wei)
 *                     example: "5000000000000000000"  # 5 Ether in Wei
 *                   gasLimit:
 *                     type: integer
 *                     description: Gas limit for the transaction
 *                     example: 21000
 *                   gasPrice:
 *                     type: string
 *                     description: Gas price for the transaction (in Wei)
 *                     example: "20000000000"  # 20 Gwei in Wei
 *                   chainId:
 *                     type: integer
 *                     description: Ethereum chain ID
 *                     example: 1
 *     responses:
 *       201:
 *         description: Configuration created
 */

/**
 * @swagger
 * /configurations:
 *   get:
 *     summary: Retrieve a list of configurations
 *     tags: [Configurations]
 *     responses:
 *       200:
 *         description: List of configurations
 */

/**
 * @swagger
 * /configurations/{id}:
 *   put:
 *     summary: Update a configuration
 *     tags: [Configurations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The configuration ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the configuration
 *                 example: "Update Monitor High Value Transactions"
 *               filter:
 *                 type: object
 *                 description: JSON object defining the transaction filter rules
 *                 properties:
 *                   from:
 *                     type: string
 *                     description: Ethereum address of the sender
 *                     example: "0x1234567890abcdef1234567890abcdef12345678"
 *                   to:
 *                     type: string
 *                     description: Ethereum address of the receiver
 *                     example: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef"
 *                   minValue:
 *                     type: string
 *                     description: Minimum value of the transaction (in Wei)
 *                     example: "1000000000000000000"  # 1 Ether in Wei
 *                   maxValue:
 *                     type: string
 *                     description: Maximum value of the transaction (in Wei)
 *                     example: "5000000000000000000"  # 5 Ether in Wei
 *                   gasLimit:
 *                     type: integer
 *                     description: Gas limit for the transaction
 *                     example: 21000
 *                   gasPrice:
 *                     type: string
 *                     description: Gas price for the transaction (in Wei)
 *                     example: "20000000000"  # 20 Gwei in Wei
 *                   chainId:
 *                     type: integer
 *                     description: Ethereum chain ID
 *                     example: 1
 *     responses:
 *       200:
 *         description: Configuration updated
 *       404:
 *         description: Configuration not found
 */

/**
 * @swagger
 * /configurations/{id}:
 *   delete:
 *     summary: Delete a configuration
 *     tags: [Configurations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The configuration ID
 *     responses:
 *       204:
 *         description: No Content
 *       404:
 *         description: Configuration not found
 */
