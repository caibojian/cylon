###
 * api
 * cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

restify = require 'restify'
socketio = require 'socket.io'
namespace = require 'node-namespace'

namespace "Api", ->
  # The Cylon API Server provides an interface to communicate with master class
  # and retrieve information about the robots being controlled.
  class @Server
    master = null

    constructor: (opts = {}) ->
      @host = opts.host || "127.0.0.1"
      @port = opts.port || "3000"

      master = opts.master

      @server = restify.createServer(name: "Cylon API Server")
      @io = socketio.listen @server

      @server.get "/", @getRobots

      @server.listen @port, @host, =>
        Logger.info "#{@server.name} is listening at #{@server.url}"

    getRobots: (req, res, next) ->
      res.send (robot.data() for robot in master.robots())
