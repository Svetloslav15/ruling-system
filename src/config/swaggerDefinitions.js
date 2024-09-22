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
 *               filter:
 *                 type: object
 *                 description: JSON object defining the transaction filter rules
 *     responses:
 *       201:
 *         description: Created
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
 *               filter:
 *                 type: object
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
