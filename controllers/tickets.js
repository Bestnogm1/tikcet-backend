import { Ticket } from '../models/tickets.js'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
dayjs.extend(relativeTime)

function index(req, res) {
  Ticket.find({})
  .populate(["owner"])
  .then(ticket => res.json(ticket))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
}
function create(req, res) {
  req.body.owner = req.user.profile
  Ticket.create(req.body)
    .then(ticket => {
      ticket.populate("owner")
      .then(ticket => res.json(ticket))
      .catch(err => {
        console.log(err)
        res.status(500).json(err);
      })
    })
    .catch(err => res.json(err))
}
function deleteTicket(req, res) {
  Ticket.findByIdAndDelete(req.params.id)
  .populate("owner")
  .then(ticket => res.json(ticket))
  .catch(err => res.status(500).json(err))
}

function update(req, res) {
  Ticket.findOneAndDelete(req.params.id, req.body, {new: true})
  .populate("owner")
  .then(ticket => res.json(ticket))
  .catch(err => res.json(err))
}

function show(req, res) {
  Ticket.findByIf(req.params.id)
  .populate("owner")
  .then(ticket =>{
    res.status(200).json(ticket)
  })
  .catch(err => res.json(err))
}

export {
  index,
  create,
  deleteTicket,
  update,
  show
}