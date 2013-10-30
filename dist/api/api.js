/*
 * api
 * cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  var namespace, restify, socketio;

  restify = require('restify');

  socketio = require('socket.io');

  namespace = require('node-namespace');

  namespace("Api", function() {
    return this.Server = (function() {
      var master;

      master = null;

      function Server(opts) {
        var _this = this;
        if (opts == null) {
          opts = {};
        }
        this.host = opts.host || "127.0.0.1";
        this.port = opts.port || "3000";
        master = opts.master;
        this.server = restify.createServer({
          name: "Cylon API Server"
        });
        this.io = socketio.listen(this.server);
        this.server.get("/", this.getRobots);
        this.server.listen(this.port, this.host, function() {
          return Logger.info("" + _this.server.name + " is listening at " + _this.server.url);
        });
      }

      Server.prototype.getRobots = function(req, res, next) {
        var robot;
        return res.send((function() {
          var _i, _len, _ref, _results;
          _ref = master.robots();
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            robot = _ref[_i];
            _results.push(robot.data());
          }
          return _results;
        })());
      };

      return Server;

    })();
  });

}).call(this);
