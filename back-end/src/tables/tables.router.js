const router = require("express").Router();
const controller = require("./tables.controller");

const reservationRouter = require("../tables/tables.router");
//router.use("/:reservation_id/seat", controller.reservationExists, reservationRouter)

router.route("/")
    .get(controller.list)
    .post(controller.create)

router.route("/:table_id/seat")
    .put(controller.seat)

module.exports = router;