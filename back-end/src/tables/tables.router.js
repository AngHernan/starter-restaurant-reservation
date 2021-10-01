const router = require("express").Router();
const controller = require("./tables.controller");
const reservationController = require("../reservations/reservations.controller")

router.route("/")
    .get(controller.list)
    .post(controller.create)

router.route("/:table_id/seat")
    .put(reservationController.reservationValidation, controller.seat)

module.exports = router;