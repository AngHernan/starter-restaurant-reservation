/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");

//const tablesRouter = require("../tables/tables.router");

//router.use("/:reservation_id/:table_id", controller.reservationExists, tablesRouter)

router.route("/")
    .get(controller.list)
    .post(controller.create)

router.route("/:reservation_id")
    .get(controller.read)

router.route("/:reservation_id/seat")
    .get(controller.findRes)

module.exports = router;
