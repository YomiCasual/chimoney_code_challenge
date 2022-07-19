const router = require("express").Router();
const {
  getAllUsers,
  updateOrAddUser,
} = require("../controllers/users.controller.js");

/**
 * @swagger
 * /users:
 *   get:
 *     description: Returns users
 *     tags:
 *      - User
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 */
router.get("/users", getAllUsers);

/**
 * @swagger
 * definitions:
 *   User:
 *     required:
 *       - name
 *       - email
 *       - age
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       age:
 *         type: integer
 */

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: User Management
 */

/**
 * @swagger
 * /users:
 *   post:
 *     description: Returns users
 *     tags: [User]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/name'
 *       - $ref: '#/parameters/age'
 *       - $ref: '#/parameters/email'
 *     responses:
 *       200:
 *         description: user
 */
router.post("/users", updateOrAddUser);

module.exports = router;
