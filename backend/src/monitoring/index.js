(() => {
  var e = {
      125: (e, t, r) => {
        "use strict";
        r(9038);
        const { Duplex: s } = r(2203);
        function i(e) {
          e.emit("close");
        }
        function n() {
          !this.destroyed && this._writableState.finished && this.destroy();
        }
        function o(e) {
          this.removeListener("error", o),
            this.destroy(),
            0 === this.listenerCount("error") && this.emit("error", e);
        }
        e.exports = function (e, t) {
          let r = !0;
          const a = new s({
            ...t,
            autoDestroy: !1,
            emitClose: !1,
            objectMode: !1,
            writableObjectMode: !1,
          });
          return (
            e.on("message", function (t, r) {
              const s = !r && a._readableState.objectMode ? t.toString() : t;
              a.push(s) || e.pause();
            }),
            e.once("error", function (e) {
              a.destroyed || ((r = !1), a.destroy(e));
            }),
            e.once("close", function () {
              a.destroyed || a.push(null);
            }),
            (a._destroy = function (t, s) {
              if (e.readyState === e.CLOSED)
                return s(t), void process.nextTick(i, a);
              let n = !1;
              e.once("error", function (e) {
                (n = !0), s(e);
              }),
                e.once("close", function () {
                  n || s(t), process.nextTick(i, a);
                }),
                r && e.terminate();
            }),
            (a._final = function (t) {
              e.readyState !== e.CONNECTING
                ? null !== e._socket &&
                  (e._socket._writableState.finished
                    ? (t(), a._readableState.endEmitted && a.destroy())
                    : (e._socket.once("finish", function () {
                        t();
                      }),
                      e.close()))
                : e.once("open", function () {
                    a._final(t);
                  });
            }),
            (a._read = function () {
              e.isPaused && e.resume();
            }),
            (a._write = function (t, r, s) {
              e.readyState !== e.CONNECTING
                ? e.send(t, s)
                : e.once("open", function () {
                    a._write(t, r, s);
                  });
            }),
            a.on("end", n),
            a.on("error", o),
            a
          );
        };
      },
      181: (e) => {
        "use strict";
        e.exports = require("buffer");
      },
      806: (e, t, r) => {
        const s = r(9896),
          i = r(6928);
        e.exports = (e) => {
          const t = s.readdirSync(e);
          let r = 0;
          for (const n of t) {
            const t = i.join(e, n),
              o = s.statSync(t);
            o.isFile() && (r += o.size);
          }
          return r;
        };
      },
      929: (e, t, r) => {
        const s = r(9896),
          i = r(6928),
          n = r(3106);
        e.exports = (e, t = __dirname) => {
          const r = Date.now() + ".log.gz";
          s.existsSync(t) || s.mkdirSync(t);
          const o = i.join(t, r),
            a = s.createReadStream(e),
            h = s.createWriteStream(o),
            c = n.createGzip();
          a.pipe(c)
            .pipe(h)
            .on("error", (e) => {
              console.error("Ошибка во время архивации:", e);
            });
        };
      },
      1371: (e, t, r) => {
        const s = r(9896),
          i = s.promises,
          n = r(6928),
          { Readable: o } = r(2203),
          a = (e) =>
            i.access(e, s.constants.F_OK).then(
              () => !0,
              () => !1,
            ),
          h = i.rename,
          c = i.writeFile,
          l = s.createWriteStream,
          d = i.unlink,
          f = i.appendFile,
          u = i.readFile,
          p = s.createReadStream,
          y = i.mkdir,
          m = async (e) => {
            let t, r, s, n, o, a;
            "string" == typeof e
              ? ((t = e), (r = "r+"), (s = 420))
              : ((t = e.filename),
                (r = e.isDir ? "r" : "r+"),
                (s = void 0 !== e.mode ? e.mode : 420));
            try {
              n = await i.open(t, r, s);
              try {
                await n.sync();
              } catch (e) {
                o = e;
              }
            } catch (t) {
              if ("EISDIR" !== t.code || !e.isDir) throw t;
            } finally {
              try {
                await n.close();
              } catch (e) {
                a = e;
              }
            }
            if (
              (o || a) &&
              (("EPERM" !== o.code && "EISDIR" !== a.code) || !e.isDir)
            ) {
              const e = new Error("Failed to flush to storage");
              throw ((e.errorOnFsync = o), (e.errorOnClose = a), e);
            }
          },
          _ = (e, t, r = 420) =>
            new Promise((s, i) => {
              try {
                const n = l(e, { mode: r }),
                  a = o.from(t);
                a.on("data", (e) => {
                  try {
                    n.write(e + "\n");
                  } catch (e) {
                    i(e);
                  }
                }),
                  a.on("end", () => {
                    n.close((e) => {
                      e ? i(e) : s();
                    });
                  }),
                  a.on("error", (e) => {
                    i(e);
                  }),
                  n.on("error", (e) => {
                    i(e);
                  });
              } catch (e) {
                i(e);
              }
            });
        (e.exports.existsAsync = a),
          (e.exports.renameAsync = h),
          (e.exports.writeFileAsync = c),
          (e.exports.writeFileLinesAsync = _),
          (e.exports.crashSafeWriteFileLinesAsync = async (
            e,
            t,
            r = { fileMode: 420, dirMode: 493 },
          ) => {
            const s = e + "~";
            await m({ filename: n.dirname(e), isDir: !0, mode: r.dirMode }),
              (await a(e)) && (await m({ filename: e, mode: r.fileMode })),
              await _(s, t, r.fileMode),
              await m({ filename: s, mode: r.fileMode }),
              await h(s, e),
              await m({ filename: n.dirname(e), isDir: !0, mode: r.dirMode });
          }),
          (e.exports.appendFileAsync = f),
          (e.exports.readFileAsync = u),
          (e.exports.unlinkAsync = d),
          (e.exports.mkdirAsync = y),
          (e.exports.readFileStream = p),
          (e.exports.flushToStorageAsync = m),
          (e.exports.ensureDatafileIntegrityAsync = async (e, t = 420) => {
            const r = e + "~";
            (await a(e)) ||
              ((await a(r))
                ? await h(r, e)
                : await c(e, "", { encoding: "utf8", mode: t }));
          }),
          (e.exports.ensureFileDoesntExistAsync = async (e) => {
            (await a(e)) && (await d(e));
          }),
          (e.exports.ensureParentDirectoryExistsAsync = async (e, t) => {
            const r = n.dirname(e),
              s = n.parse(n.resolve(r));
            ("win32" === process.platform &&
              s.dir === s.root &&
              "" === s.base) ||
              (await y(r, { recursive: !0, mode: t }));
          });
      },
      1460: (e, t, r) => {
        "use strict";
        const { EMPTY_BUFFER: s } = r(6832),
          i = Buffer[Symbol.species];
        function n(e, t, r, s, i) {
          for (let n = 0; n < i; n++) r[s + n] = e[n] ^ t[3 & n];
        }
        function o(e, t) {
          for (let r = 0; r < e.length; r++) e[r] ^= t[3 & r];
        }
        if (
          ((e.exports = {
            concat: function (e, t) {
              if (0 === e.length) return s;
              if (1 === e.length) return e[0];
              const r = Buffer.allocUnsafe(t);
              let n = 0;
              for (let t = 0; t < e.length; t++) {
                const s = e[t];
                r.set(s, n), (n += s.length);
              }
              return n < t ? new i(r.buffer, r.byteOffset, n) : r;
            },
            mask: n,
            toArrayBuffer: function (e) {
              return e.length === e.buffer.byteLength
                ? e.buffer
                : e.buffer.slice(e.byteOffset, e.byteOffset + e.length);
            },
            toBuffer: function e(t) {
              if (((e.readOnly = !0), Buffer.isBuffer(t))) return t;
              let r;
              return (
                t instanceof ArrayBuffer
                  ? (r = new i(t))
                  : ArrayBuffer.isView(t)
                    ? (r = new i(t.buffer, t.byteOffset, t.byteLength))
                    : ((r = Buffer.from(t)), (e.readOnly = !1)),
                r
              );
            },
            unmask: o,
          }),
          !process.env.WS_NO_BUFFER_UTIL)
        )
          try {
            const t = r(
              Object(
                (function () {
                  var e = new Error("Cannot find module 'bufferutil'");
                  throw ((e.code = "MODULE_NOT_FOUND"), e);
                })(),
              ),
            );
            (e.exports.mask = function (e, r, s, i, o) {
              o < 48 ? n(e, r, s, i, o) : t.mask(e, r, s, i, o);
            }),
              (e.exports.unmask = function (e, r) {
                e.length < 32 ? o(e, r) : t.unmask(e, r);
              });
          } catch (e) {}
      },
      1721: (e) => {
        e.exports = (e) =>
          JSON.stringify({ time: e.time, text: JSON.stringify(e) });
      },
      1799: (e, t, r) => {
        const s = r(7592),
          i = r(929),
          n = r(6348),
          o = r(806),
          a = r(5145),
          h = r(5403),
          c = r(1721);
        e.exports = {
          cleanOldestFileInFolder: s,
          createArchive: i,
          getFileSize: n,
          getFolderSize: o,
          createFileIfNotExists: a,
          createFolderIfNotExists: h,
          mapDataToMessage: c,
        };
      },
      2028: (e, t, r) => {
        r(3629), (e.exports.AVLTree = r(6389));
      },
      2119: (e, t, r) => {
        const { EventEmitter: s } = r(4434),
          { callbackify: i, deprecate: n } = r(9023),
          o = r(9686),
          a = r(3098),
          h = r(4277),
          c = r(4178),
          l = r(5387),
          d = r(8509),
          { isDate: f, pick: u, filterIndexNames: p } = r(4191);
        e.exports = class extends s {
          constructor(e) {
            let t;
            super(),
              "string" == typeof e
                ? n(() => {
                    (t = e), (this.inMemoryOnly = !1);
                  }, "@seald-io/nedb: Giving a string to the Datastore constructor is deprecated and will be removed in the next major version. Please use an options object with an argument 'filename'.")()
                : ((t = (e = e || {}).filename),
                  (this.inMemoryOnly = e.inMemoryOnly || !1),
                  (this.autoload = e.autoload || !1),
                  (this.timestampData = e.timestampData || !1)),
              t && "string" == typeof t && 0 !== t.length
                ? (this.filename = t)
                : ((this.filename = null), (this.inMemoryOnly = !0)),
              (this.compareStrings = e.compareStrings),
              (this.persistence = new d({
                db: this,
                afterSerialization: e.afterSerialization,
                beforeDeserialization: e.beforeDeserialization,
                corruptAlertThreshold: e.corruptAlertThreshold,
                modes: e.modes,
                testSerializationHooks: e.testSerializationHooks,
              })),
              (this.executor = new h()),
              this.inMemoryOnly && (this.executor.ready = !0),
              (this.indexes = {}),
              (this.indexes._id = new c({ fieldName: "_id", unique: !0 })),
              (this.ttlIndexes = {}),
              this.autoload
                ? ((this.autoloadPromise = this.loadDatabaseAsync()),
                  this.autoloadPromise.then(
                    () => {
                      e.onload && e.onload();
                    },
                    (t) => {
                      if (!e.onload) throw t;
                      e.onload(t);
                    },
                  ))
                : (this.autoloadPromise = null),
              (this._autocompactionIntervalId = null);
          }
          compactDatafileAsync() {
            return this.executor.pushAsync(() =>
              this.persistence.persistCachedDatabaseAsync(),
            );
          }
          compactDatafile(e) {
            const t = this.compactDatafileAsync();
            "function" == typeof e && i(() => t)(e);
          }
          setAutocompactionInterval(e) {
            if (Number.isNaN(Number(e)))
              throw new Error("Interval must be a non-NaN number");
            const t = Math.max(Number(e), 5e3);
            this.stopAutocompaction(),
              (this._autocompactionIntervalId = setInterval(() => {
                this.compactDatafile();
              }, t));
          }
          stopAutocompaction() {
            this._autocompactionIntervalId &&
              (clearInterval(this._autocompactionIntervalId),
              (this._autocompactionIntervalId = null));
          }
          loadDatabase(e) {
            const t = this.loadDatabaseAsync();
            "function" == typeof e && i(() => t)(e);
          }
          dropDatabaseAsync() {
            return this.persistence.dropDatabaseAsync();
          }
          dropDatabase(e) {
            const t = this.dropDatabaseAsync();
            "function" == typeof e && i(() => t)(e);
          }
          loadDatabaseAsync() {
            return this.executor.pushAsync(
              () => this.persistence.loadDatabaseAsync(),
              !0,
            );
          }
          getAllData() {
            return this.indexes._id.getAll();
          }
          _resetIndexes(e) {
            for (const t of Object.values(this.indexes)) t.reset(e);
          }
          ensureIndex(e = {}, t) {
            const r = this.ensureIndexAsync(e);
            "function" == typeof t && i(() => r)(t);
          }
          async ensureIndexAsync(e = {}) {
            if (!e.fieldName) {
              const e = new Error("Cannot create an index without a fieldName");
              throw ((e.missingFieldName = !0), e);
            }
            const t = [].concat(e.fieldName).sort();
            if (t.some((e) => e.includes(",")))
              throw new Error("Cannot use comma in index fieldName");
            const r = { ...e, fieldName: t.join(",") };
            if (!this.indexes[r.fieldName]) {
              (this.indexes[r.fieldName] = new c(r)),
                void 0 !== e.expireAfterSeconds &&
                  (this.ttlIndexes[r.fieldName] = r.expireAfterSeconds);
              try {
                this.indexes[r.fieldName].insert(this.getAllData());
              } catch (e) {
                throw (delete this.indexes[r.fieldName], e);
              }
              await this.executor.pushAsync(
                () =>
                  this.persistence.persistNewStateAsync([
                    { $$indexCreated: r },
                  ]),
                !0,
              );
            }
          }
          removeIndex(e, t = () => {}) {
            const r = this.removeIndexAsync(e);
            i(() => r)(t);
          }
          async removeIndexAsync(e) {
            delete this.indexes[e],
              await this.executor.pushAsync(
                () =>
                  this.persistence.persistNewStateAsync([
                    { $$indexRemoved: e },
                  ]),
                !0,
              );
          }
          _addToIndexes(e) {
            let t, r;
            const s = Object.keys(this.indexes);
            for (let i = 0; i < s.length; i += 1)
              try {
                this.indexes[s[i]].insert(e);
              } catch (e) {
                (t = i), (r = e);
                break;
              }
            if (r) {
              for (let r = 0; r < t; r += 1) this.indexes[s[r]].remove(e);
              throw r;
            }
          }
          _removeFromIndexes(e) {
            for (const t of Object.values(this.indexes)) t.remove(e);
          }
          _updateIndexes(e, t) {
            let r, s;
            const i = Object.keys(this.indexes);
            for (let n = 0; n < i.length; n += 1)
              try {
                this.indexes[i[n]].update(e, t);
              } catch (e) {
                (r = n), (s = e);
                break;
              }
            if (s) {
              for (let s = 0; s < r; s += 1)
                this.indexes[i[s]].revertUpdate(e, t);
              throw s;
            }
          }
          _getRawCandidates(e) {
            const t = Object.keys(this.indexes);
            let r;
            if (((r = Object.entries(e).filter(p(t)).pop()), r))
              return this.indexes[r[0]].getMatching(r[1]);
            const s = t
              .filter((e) => -1 !== e.indexOf(","))
              .map((e) => e.split(","))
              .filter(
                (t) => Object.entries(e).filter(p(t)).length === t.length,
              );
            return s.length > 0
              ? this.indexes[s[0]].getMatching(u(e, s[0]))
              : ((r = Object.entries(e)
                  .filter(
                    ([r, s]) =>
                      !(
                        !e[r] ||
                        !Object.prototype.hasOwnProperty.call(e[r], "$in")
                      ) && t.includes(r),
                  )
                  .pop()),
                r
                  ? this.indexes[r[0]].getMatching(r[1].$in)
                  : ((r = Object.entries(e)
                      .filter(
                        ([r, s]) =>
                          !(
                            !e[r] ||
                            !(
                              Object.prototype.hasOwnProperty.call(
                                e[r],
                                "$lt",
                              ) ||
                              Object.prototype.hasOwnProperty.call(
                                e[r],
                                "$lte",
                              ) ||
                              Object.prototype.hasOwnProperty.call(
                                e[r],
                                "$gt",
                              ) ||
                              Object.prototype.hasOwnProperty.call(e[r], "$gte")
                            )
                          ) && t.includes(r),
                      )
                      .pop()),
                    r
                      ? this.indexes[r[0]].getBetweenBounds(r[1])
                      : this.getAllData()));
          }
          async _getCandidatesAsync(e, t = !1) {
            const r = [],
              s = this._getRawCandidates(e);
            if (t) r.push(...s);
            else {
              const e = [],
                t = Object.keys(this.ttlIndexes);
              s.forEach((s) => {
                t.every(
                  (e) =>
                    !(
                      void 0 !== s[e] &&
                      f(s[e]) &&
                      Date.now() > s[e].getTime() + 1e3 * this.ttlIndexes[e]
                    ),
                )
                  ? r.push(s)
                  : e.push(s._id);
              });
              for (const t of e) await this._removeAsync({ _id: t }, {});
            }
            return r;
          }
          async _insertAsync(e) {
            const t = this._prepareDocumentForInsertion(e);
            return (
              this._insertInCache(t),
              await this.persistence.persistNewStateAsync(
                Array.isArray(t) ? t : [t],
              ),
              l.deepCopy(t)
            );
          }
          _createNewId() {
            let e = a.uid(16);
            return (
              this.indexes._id.getMatching(e).length > 0 &&
                (e = this._createNewId()),
              e
            );
          }
          _prepareDocumentForInsertion(e) {
            let t;
            if (Array.isArray(e))
              (t = []),
                e.forEach((e) => {
                  t.push(this._prepareDocumentForInsertion(e));
                });
            else {
              (t = l.deepCopy(e)),
                void 0 === t._id && (t._id = this._createNewId());
              const r = new Date();
              this.timestampData && void 0 === t.createdAt && (t.createdAt = r),
                this.timestampData &&
                  void 0 === t.updatedAt &&
                  (t.updatedAt = r),
                l.checkObject(t);
            }
            return t;
          }
          _insertInCache(e) {
            Array.isArray(e)
              ? this._insertMultipleDocsInCache(e)
              : this._addToIndexes(e);
          }
          _insertMultipleDocsInCache(e) {
            let t, r;
            for (let s = 0; s < e.length; s += 1)
              try {
                this._addToIndexes(e[s]);
              } catch (e) {
                (r = e), (t = s);
                break;
              }
            if (r) {
              for (let r = 0; r < t; r += 1) this._removeFromIndexes(e[r]);
              throw r;
            }
          }
          insert(e, t) {
            const r = this.insertAsync(e);
            "function" == typeof t && i(() => r)(t);
          }
          insertAsync(e) {
            return this.executor.pushAsync(() => this._insertAsync(e));
          }
          count(e, t) {
            const r = this.countAsync(e);
            if ("function" != typeof t) return r;
            i(r.execAsync.bind(r))(t);
          }
          countAsync(e) {
            return new o(this, e, (e) => e.length);
          }
          find(e, t, r) {
            1 === arguments.length
              ? (t = {})
              : 2 === arguments.length &&
                "function" == typeof t &&
                ((r = t), (t = {}));
            const s = this.findAsync(e, t);
            if ("function" != typeof r) return s;
            i(s.execAsync.bind(s))(r);
          }
          findAsync(e, t = {}) {
            const r = new o(this, e, (e) => e.map((e) => l.deepCopy(e)));
            return r.projection(t), r;
          }
          findOne(e, t, r) {
            1 === arguments.length
              ? (t = {})
              : 2 === arguments.length &&
                "function" == typeof t &&
                ((r = t), (t = {}));
            const s = this.findOneAsync(e, t);
            if ("function" != typeof r) return s;
            i(s.execAsync.bind(s))(r);
          }
          findOneAsync(e, t = {}) {
            const r = new o(this, e, (e) =>
              1 === e.length ? l.deepCopy(e[0]) : null,
            );
            return r.projection(t).limit(1), r;
          }
          async _updateAsync(e, t, r) {
            const s = void 0 !== r.multi && r.multi;
            if (void 0 !== r.upsert && r.upsert) {
              const r = new o(this, e);
              if (1 !== (await r.limit(1)._execAsync()).length) {
                let r;
                try {
                  l.checkObject(t), (r = t);
                } catch (s) {
                  r = l.modify(l.deepCopy(e, !0), t);
                }
                return {
                  numAffected: 1,
                  affectedDocuments: await this._insertAsync(r),
                  upsert: !0,
                };
              }
            }
            let i,
              n = 0;
            const a = [];
            let h;
            const c = await this._getCandidatesAsync(e);
            for (const r of c)
              l.match(r, e) &&
                (s || 0 === n) &&
                ((n += 1),
                this.timestampData && (h = r.createdAt),
                (i = l.modify(r, t)),
                this.timestampData &&
                  ((i.createdAt = h), (i.updatedAt = new Date())),
                a.push({ oldDoc: r, newDoc: i }));
            this._updateIndexes(a);
            const d = a.map((e) => e.newDoc);
            if (
              (await this.persistence.persistNewStateAsync(d),
              r.returnUpdatedDocs)
            ) {
              let e = [];
              return (
                d.forEach((t) => {
                  e.push(l.deepCopy(t));
                }),
                s || (e = e[0]),
                { numAffected: n, affectedDocuments: e, upsert: !1 }
              );
            }
            return { numAffected: n, upsert: !1, affectedDocuments: null };
          }
          update(e, t, r, s) {
            "function" == typeof r && ((s = r), (r = {})),
              i((e, t, r) => this.updateAsync(e, t, r))(
                e,
                t,
                r,
                (e, t = {}) => {
                  s && s(e, t.numAffected, t.affectedDocuments, t.upsert);
                },
              );
          }
          updateAsync(e, t, r = {}) {
            return this.executor.pushAsync(() => this._updateAsync(e, t, r));
          }
          async _removeAsync(e, t = {}) {
            const r = void 0 !== t.multi && t.multi,
              s = await this._getCandidatesAsync(e, !0),
              i = [];
            let n = 0;
            return (
              s.forEach((t) => {
                l.match(t, e) &&
                  (r || 0 === n) &&
                  ((n += 1),
                  i.push({ $$deleted: !0, _id: t._id }),
                  this._removeFromIndexes(t));
              }),
              await this.persistence.persistNewStateAsync(i),
              n
            );
          }
          remove(e, t, r) {
            "function" == typeof t && ((r = t), (t = {}));
            const s = r || (() => {});
            i((e, t) => this.removeAsync(e, t))(e, t, s);
          }
          removeAsync(e, t = {}) {
            return this.executor.pushAsync(() => this._removeAsync(e, t));
          }
        };
      },
      2203: (e) => {
        "use strict";
        e.exports = require("stream");
      },
      3098: (e, t, r) => {
        const s = r(6982);
        e.exports.uid = (e) =>
          s
            .randomBytes(Math.ceil(Math.max(8, 2 * e)))
            .toString("base64")
            .replace(/[+/]/g, "")
            .slice(0, e);
      },
      3106: (e) => {
        "use strict";
        e.exports = require("zlib");
      },
      3557: (e) => {
        "use strict";
        e.exports = require("timers");
      },
      3629: (e, t, r) => {
        const s = r(7864);
        function i(e, t) {
          for (let r = 0; r < t.length; r += 1) e.push(t[r]);
        }
        e.exports = class {
          constructor(e) {
            (e = e || {}),
              (this.left = null),
              (this.right = null),
              (this.parent = void 0 !== e.parent ? e.parent : null),
              Object.prototype.hasOwnProperty.call(e, "key") &&
                (this.key = e.key),
              (this.data = Object.prototype.hasOwnProperty.call(e, "value")
                ? [e.value]
                : []),
              (this.unique = e.unique || !1),
              (this.compareKeys =
                e.compareKeys || s.defaultCompareKeysFunction),
              (this.checkValueEquality =
                e.checkValueEquality || s.defaultCheckValueEquality);
          }
          getMaxKeyDescendant() {
            return this.right ? this.right.getMaxKeyDescendant() : this;
          }
          getMaxKey() {
            return this.getMaxKeyDescendant().key;
          }
          getMinKeyDescendant() {
            return this.left ? this.left.getMinKeyDescendant() : this;
          }
          getMinKey() {
            return this.getMinKeyDescendant().key;
          }
          checkAllNodesFullfillCondition(e) {
            Object.prototype.hasOwnProperty.call(this, "key") &&
              (e(this.key, this.data),
              this.left && this.left.checkAllNodesFullfillCondition(e),
              this.right && this.right.checkAllNodesFullfillCondition(e));
          }
          checkNodeOrdering() {
            Object.prototype.hasOwnProperty.call(this, "key") &&
              (this.left &&
                (this.left.checkAllNodesFullfillCondition((e) => {
                  if (this.compareKeys(e, this.key) >= 0)
                    throw new Error(
                      `Tree with root ${this.key} is not a binary search tree`,
                    );
                }),
                this.left.checkNodeOrdering()),
              this.right &&
                (this.right.checkAllNodesFullfillCondition((e) => {
                  if (this.compareKeys(e, this.key) <= 0)
                    throw new Error(
                      `Tree with root ${this.key} is not a binary search tree`,
                    );
                }),
                this.right.checkNodeOrdering()));
          }
          checkInternalPointers() {
            if (this.left) {
              if (this.left.parent !== this)
                throw new Error(`Parent pointer broken for key ${this.key}`);
              this.left.checkInternalPointers();
            }
            if (this.right) {
              if (this.right.parent !== this)
                throw new Error(`Parent pointer broken for key ${this.key}`);
              this.right.checkInternalPointers();
            }
          }
          checkIsBST() {
            if (
              (this.checkNodeOrdering(),
              this.checkInternalPointers(),
              this.parent)
            )
              throw new Error("The root shouldn't have a parent");
          }
          getNumberOfKeys() {
            let e;
            return Object.prototype.hasOwnProperty.call(this, "key")
              ? ((e = 1),
                this.left && (e += this.left.getNumberOfKeys()),
                this.right && (e += this.right.getNumberOfKeys()),
                e)
              : 0;
          }
          createSimilar(e) {
            return (
              ((e = e || {}).unique = this.unique),
              (e.compareKeys = this.compareKeys),
              (e.checkValueEquality = this.checkValueEquality),
              new this.constructor(e)
            );
          }
          createLeftChild(e) {
            const t = this.createSimilar(e);
            return (t.parent = this), (this.left = t), t;
          }
          createRightChild(e) {
            const t = this.createSimilar(e);
            return (t.parent = this), (this.right = t), t;
          }
          insert(e, t) {
            if (!Object.prototype.hasOwnProperty.call(this, "key"))
              return (this.key = e), void this.data.push(t);
            if (0 !== this.compareKeys(this.key, e))
              this.compareKeys(e, this.key) < 0
                ? this.left
                  ? this.left.insert(e, t)
                  : this.createLeftChild({ key: e, value: t })
                : this.right
                  ? this.right.insert(e, t)
                  : this.createRightChild({ key: e, value: t });
            else {
              if (this.unique) {
                const t = new Error(
                  `Can't insert key ${JSON.stringify(e)}, it violates the unique constraint`,
                );
                throw ((t.key = e), (t.errorType = "uniqueViolated"), t);
              }
              this.data.push(t);
            }
          }
          search(e) {
            return Object.prototype.hasOwnProperty.call(this, "key")
              ? 0 === this.compareKeys(this.key, e)
                ? this.data
                : this.compareKeys(e, this.key) < 0
                  ? this.left
                    ? this.left.search(e)
                    : []
                  : this.right
                    ? this.right.search(e)
                    : []
              : [];
          }
          getLowerBoundMatcher(e) {
            return Object.prototype.hasOwnProperty.call(e, "$gt") ||
              Object.prototype.hasOwnProperty.call(e, "$gte")
              ? Object.prototype.hasOwnProperty.call(e, "$gt") &&
                Object.prototype.hasOwnProperty.call(e, "$gte")
                ? 0 === this.compareKeys(e.$gte, e.$gt)
                  ? (t) => this.compareKeys(t, e.$gt) > 0
                  : this.compareKeys(e.$gte, e.$gt) > 0
                    ? (t) => this.compareKeys(t, e.$gte) >= 0
                    : (t) => this.compareKeys(t, e.$gt) > 0
                : Object.prototype.hasOwnProperty.call(e, "$gt")
                  ? (t) => this.compareKeys(t, e.$gt) > 0
                  : (t) => this.compareKeys(t, e.$gte) >= 0
              : () => !0;
          }
          getUpperBoundMatcher(e) {
            return Object.prototype.hasOwnProperty.call(e, "$lt") ||
              Object.prototype.hasOwnProperty.call(e, "$lte")
              ? Object.prototype.hasOwnProperty.call(e, "$lt") &&
                Object.prototype.hasOwnProperty.call(e, "$lte")
                ? 0 === this.compareKeys(e.$lte, e.$lt)
                  ? (t) => this.compareKeys(t, e.$lt) < 0
                  : this.compareKeys(e.$lte, e.$lt) < 0
                    ? (t) => this.compareKeys(t, e.$lte) <= 0
                    : (t) => this.compareKeys(t, e.$lt) < 0
                : Object.prototype.hasOwnProperty.call(e, "$lt")
                  ? (t) => this.compareKeys(t, e.$lt) < 0
                  : (t) => this.compareKeys(t, e.$lte) <= 0
              : () => !0;
          }
          betweenBounds(e, t, r) {
            const s = [];
            return Object.prototype.hasOwnProperty.call(this, "key")
              ? ((t = t || this.getLowerBoundMatcher(e)),
                (r = r || this.getUpperBoundMatcher(e)),
                t(this.key) &&
                  this.left &&
                  i(s, this.left.betweenBounds(e, t, r)),
                t(this.key) && r(this.key) && i(s, this.data),
                r(this.key) &&
                  this.right &&
                  i(s, this.right.betweenBounds(e, t, r)),
                s)
              : [];
          }
          deleteIfLeaf() {
            return !(
              this.left ||
              this.right ||
              (this.parent
                ? (this.parent.left === this
                    ? (this.parent.left = null)
                    : (this.parent.right = null),
                  0)
                : (delete this.key, (this.data = []), 0))
            );
          }
          deleteIfOnlyOneChild() {
            let e;
            return (
              this.left && !this.right && (e = this.left),
              !this.left && this.right && (e = this.right),
              !!e &&
                (this.parent
                  ? (this.parent.left === this
                      ? ((this.parent.left = e), (e.parent = this.parent))
                      : ((this.parent.right = e), (e.parent = this.parent)),
                    !0)
                  : ((this.key = e.key),
                    (this.data = e.data),
                    (this.left = null),
                    e.left && ((this.left = e.left), (e.left.parent = this)),
                    (this.right = null),
                    e.right &&
                      ((this.right = e.right), (e.right.parent = this)),
                    !0))
            );
          }
          delete(e, t) {
            const r = [];
            let s;
            if (Object.prototype.hasOwnProperty.call(this, "key"))
              if (this.compareKeys(e, this.key) < 0)
                this.left && this.left.delete(e, t);
              else if (this.compareKeys(e, this.key) > 0)
                this.right && this.right.delete(e, t);
              else if (0 !== !this.compareKeys(e, this.key))
                return this.data.length > 1 && void 0 !== t
                  ? (this.data.forEach((e) => {
                      this.checkValueEquality(e, t) || r.push(e);
                    }),
                    void (this.data = r))
                  : void (
                      this.deleteIfLeaf() ||
                      this.deleteIfOnlyOneChild() ||
                      (Math.random() >= 0.5
                        ? ((s = this.left.getMaxKeyDescendant()),
                          (this.key = s.key),
                          (this.data = s.data),
                          this === s.parent
                            ? ((this.left = s.left),
                              s.left && (s.left.parent = s.parent))
                            : ((s.parent.right = s.left),
                              s.left && (s.left.parent = s.parent)))
                        : ((s = this.right.getMinKeyDescendant()),
                          (this.key = s.key),
                          (this.data = s.data),
                          this === s.parent
                            ? ((this.right = s.right),
                              s.right && (s.right.parent = s.parent))
                            : ((s.parent.left = s.right),
                              s.right && (s.right.parent = s.parent))))
                    );
          }
          executeOnEveryNode(e) {
            this.left && this.left.executeOnEveryNode(e),
              e(this),
              this.right && this.right.executeOnEveryNode(e);
          }
          prettyPrint(e, t) {
            (t = t || ""),
              console.log(`${t}* ${this.key}`),
              e && console.log(`${t}* ${this.data}`),
              (this.left || this.right) &&
                (this.left
                  ? this.left.prettyPrint(e, `${t}  `)
                  : console.log(`${t}  *`),
                this.right
                  ? this.right.prettyPrint(e, `${t}  `)
                  : console.log(`${t}  *`));
          }
        };
      },
      3868: (e, t, r) => {
        const s = r(9896),
          i = r(6928);
        e.exports = (e) => {
          s.existsSync(e) || s.mkdirSync(e);
          const t = s
            .readdirSync(e)
            .filter((t) => s.statSync(i.join(e, t)).isFile());
          if (0 === t.length) return null;
          const r = t
            .map((e) => {
              const t = e.match(/^(\d{13})/);
              return { name: e, timestamp: t ? Number(t[1]) : null };
            })
            .filter(
              (e) => "number" == typeof e.timestamp && !isNaN(e.timestamp),
            );
          return 0 === r.length
            ? null
            : (r.sort((e, t) => e.timestamp - t.timestamp), r[0].name);
        };
      },
      4029: (e, t, r) => {
        "use strict";
        const s = r(3106),
          i = r(1460),
          n = r(9693),
          { kStatusCode: o } = r(6832),
          a = Buffer[Symbol.species],
          h = Buffer.from([0, 0, 255, 255]),
          c = Symbol("permessage-deflate"),
          l = Symbol("total-length"),
          d = Symbol("callback"),
          f = Symbol("buffers"),
          u = Symbol("error");
        let p;
        function y(e) {
          this[f].push(e), (this[l] += e.length);
        }
        function m(e) {
          (this[l] += e.length),
            this[c]._maxPayload < 1 || this[l] <= this[c]._maxPayload
              ? this[f].push(e)
              : ((this[u] = new RangeError("Max payload size exceeded")),
                (this[u].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"),
                (this[u][o] = 1009),
                this.removeListener("data", m),
                this.reset());
        }
        function _(e) {
          (this[c]._inflate = null),
            this[u] ? this[d](this[u]) : ((e[o] = 1007), this[d](e));
        }
        e.exports = class {
          constructor(e, t, r) {
            if (
              ((this._maxPayload = 0 | r),
              (this._options = e || {}),
              (this._threshold =
                void 0 !== this._options.threshold
                  ? this._options.threshold
                  : 1024),
              (this._isServer = !!t),
              (this._deflate = null),
              (this._inflate = null),
              (this.params = null),
              !p)
            ) {
              const e =
                void 0 !== this._options.concurrencyLimit
                  ? this._options.concurrencyLimit
                  : 10;
              p = new n(e);
            }
          }
          static get extensionName() {
            return "permessage-deflate";
          }
          offer() {
            const e = {};
            return (
              this._options.serverNoContextTakeover &&
                (e.server_no_context_takeover = !0),
              this._options.clientNoContextTakeover &&
                (e.client_no_context_takeover = !0),
              this._options.serverMaxWindowBits &&
                (e.server_max_window_bits = this._options.serverMaxWindowBits),
              this._options.clientMaxWindowBits
                ? (e.client_max_window_bits = this._options.clientMaxWindowBits)
                : null == this._options.clientMaxWindowBits &&
                  (e.client_max_window_bits = !0),
              e
            );
          }
          accept(e) {
            return (
              (e = this.normalizeParams(e)),
              (this.params = this._isServer
                ? this.acceptAsServer(e)
                : this.acceptAsClient(e)),
              this.params
            );
          }
          cleanup() {
            if (
              (this._inflate && (this._inflate.close(), (this._inflate = null)),
              this._deflate)
            ) {
              const e = this._deflate[d];
              this._deflate.close(),
                (this._deflate = null),
                e &&
                  e(
                    new Error(
                      "The deflate stream was closed while data was being processed",
                    ),
                  );
            }
          }
          acceptAsServer(e) {
            const t = this._options,
              r = e.find(
                (e) =>
                  !(
                    (!1 === t.serverNoContextTakeover &&
                      e.server_no_context_takeover) ||
                    (e.server_max_window_bits &&
                      (!1 === t.serverMaxWindowBits ||
                        ("number" == typeof t.serverMaxWindowBits &&
                          t.serverMaxWindowBits > e.server_max_window_bits))) ||
                    ("number" == typeof t.clientMaxWindowBits &&
                      !e.client_max_window_bits)
                  ),
              );
            if (!r)
              throw new Error("None of the extension offers can be accepted");
            return (
              t.serverNoContextTakeover && (r.server_no_context_takeover = !0),
              t.clientNoContextTakeover && (r.client_no_context_takeover = !0),
              "number" == typeof t.serverMaxWindowBits &&
                (r.server_max_window_bits = t.serverMaxWindowBits),
              "number" == typeof t.clientMaxWindowBits
                ? (r.client_max_window_bits = t.clientMaxWindowBits)
                : (!0 !== r.client_max_window_bits &&
                    !1 !== t.clientMaxWindowBits) ||
                  delete r.client_max_window_bits,
              r
            );
          }
          acceptAsClient(e) {
            const t = e[0];
            if (
              !1 === this._options.clientNoContextTakeover &&
              t.client_no_context_takeover
            )
              throw new Error(
                'Unexpected parameter "client_no_context_takeover"',
              );
            if (t.client_max_window_bits) {
              if (
                !1 === this._options.clientMaxWindowBits ||
                ("number" == typeof this._options.clientMaxWindowBits &&
                  t.client_max_window_bits > this._options.clientMaxWindowBits)
              )
                throw new Error(
                  'Unexpected or invalid parameter "client_max_window_bits"',
                );
            } else
              "number" == typeof this._options.clientMaxWindowBits &&
                (t.client_max_window_bits = this._options.clientMaxWindowBits);
            return t;
          }
          normalizeParams(e) {
            return (
              e.forEach((e) => {
                Object.keys(e).forEach((t) => {
                  let r = e[t];
                  if (r.length > 1)
                    throw new Error(
                      `Parameter "${t}" must have only a single value`,
                    );
                  if (((r = r[0]), "client_max_window_bits" === t)) {
                    if (!0 !== r) {
                      const e = +r;
                      if (!Number.isInteger(e) || e < 8 || e > 15)
                        throw new TypeError(
                          `Invalid value for parameter "${t}": ${r}`,
                        );
                      r = e;
                    } else if (!this._isServer)
                      throw new TypeError(
                        `Invalid value for parameter "${t}": ${r}`,
                      );
                  } else if ("server_max_window_bits" === t) {
                    const e = +r;
                    if (!Number.isInteger(e) || e < 8 || e > 15)
                      throw new TypeError(
                        `Invalid value for parameter "${t}": ${r}`,
                      );
                    r = e;
                  } else {
                    if (
                      "client_no_context_takeover" !== t &&
                      "server_no_context_takeover" !== t
                    )
                      throw new Error(`Unknown parameter "${t}"`);
                    if (!0 !== r)
                      throw new TypeError(
                        `Invalid value for parameter "${t}": ${r}`,
                      );
                  }
                  e[t] = r;
                });
              }),
              e
            );
          }
          decompress(e, t, r) {
            p.add((s) => {
              this._decompress(e, t, (e, t) => {
                s(), r(e, t);
              });
            });
          }
          compress(e, t, r) {
            p.add((s) => {
              this._compress(e, t, (e, t) => {
                s(), r(e, t);
              });
            });
          }
          _decompress(e, t, r) {
            const n = this._isServer ? "client" : "server";
            if (!this._inflate) {
              const e = `${n}_max_window_bits`,
                t =
                  "number" != typeof this.params[e]
                    ? s.Z_DEFAULT_WINDOWBITS
                    : this.params[e];
              (this._inflate = s.createInflateRaw({
                ...this._options.zlibInflateOptions,
                windowBits: t,
              })),
                (this._inflate[c] = this),
                (this._inflate[l] = 0),
                (this._inflate[f] = []),
                this._inflate.on("error", _),
                this._inflate.on("data", m);
            }
            (this._inflate[d] = r),
              this._inflate.write(e),
              t && this._inflate.write(h),
              this._inflate.flush(() => {
                const e = this._inflate[u];
                if (e)
                  return (
                    this._inflate.close(), (this._inflate = null), void r(e)
                  );
                const s = i.concat(this._inflate[f], this._inflate[l]);
                this._inflate._readableState.endEmitted
                  ? (this._inflate.close(), (this._inflate = null))
                  : ((this._inflate[l] = 0),
                    (this._inflate[f] = []),
                    t &&
                      this.params[`${n}_no_context_takeover`] &&
                      this._inflate.reset()),
                  r(null, s);
              });
          }
          _compress(e, t, r) {
            const n = this._isServer ? "server" : "client";
            if (!this._deflate) {
              const e = `${n}_max_window_bits`,
                t =
                  "number" != typeof this.params[e]
                    ? s.Z_DEFAULT_WINDOWBITS
                    : this.params[e];
              (this._deflate = s.createDeflateRaw({
                ...this._options.zlibDeflateOptions,
                windowBits: t,
              })),
                (this._deflate[l] = 0),
                (this._deflate[f] = []),
                this._deflate.on("data", y);
            }
            (this._deflate[d] = r),
              this._deflate.write(e),
              this._deflate.flush(s.Z_SYNC_FLUSH, () => {
                if (!this._deflate) return;
                let e = i.concat(this._deflate[f], this._deflate[l]);
                t && (e = new a(e.buffer, e.byteOffset, e.length - 4)),
                  (this._deflate[d] = null),
                  (this._deflate[l] = 0),
                  (this._deflate[f] = []),
                  t &&
                    this.params[`${n}_no_context_takeover`] &&
                    this._deflate.reset(),
                  r(null, e);
              });
          }
        };
      },
      4178: (e, t, r) => {
        const s = r(2028).AVLTree,
          i = r(5387),
          { uniq: n, isDate: o } = r(4191),
          a = (e, t) => e === t,
          h = (e) =>
            null === e
              ? "$null"
              : "string" == typeof e
                ? "$string" + e
                : "boolean" == typeof e
                  ? "$boolean" + e
                  : "number" == typeof e
                    ? "$number" + e
                    : o(e)
                      ? "$date" + e.getTime()
                      : e;
        e.exports = class {
          constructor(e) {
            if (
              ((this.fieldName = e.fieldName),
              "string" != typeof this.fieldName)
            )
              throw new Error("fieldName must be a string");
            (this._fields = this.fieldName.split(",")),
              (this.unique = e.unique || !1),
              (this.sparse = e.sparse || !1),
              (this.treeOptions = {
                unique: this.unique,
                compareKeys: i.compareThings,
                checkValueEquality: a,
              }),
              (this.tree = new s(this.treeOptions));
          }
          reset(e) {
            (this.tree = new s(this.treeOptions)), e && this.insert(e);
          }
          insert(e) {
            let t, r, s;
            if (Array.isArray(e)) return void this.insertMultipleDocs(e);
            const o = i.getDotValues(e, this._fields);
            if (
              !(
                void 0 === o ||
                ("object" == typeof o &&
                  null !== o &&
                  Object.values(o).every((e) => void 0 === e))
              ) ||
              !this.sparse
            )
              if (Array.isArray(o)) {
                t = n(o, h);
                for (let i = 0; i < t.length; i += 1)
                  try {
                    this.tree.insert(t[i], e);
                  } catch (e) {
                    (s = e), (r = i);
                    break;
                  }
                if (s) {
                  for (let s = 0; s < r; s += 1) this.tree.delete(t[s], e);
                  throw s;
                }
              } else this.tree.insert(o, e);
          }
          insertMultipleDocs(e) {
            let t, r;
            for (let s = 0; s < e.length; s += 1)
              try {
                this.insert(e[s]);
              } catch (e) {
                (t = e), (r = s);
                break;
              }
            if (t) {
              for (let t = 0; t < r; t += 1) this.remove(e[t]);
              throw t;
            }
          }
          remove(e) {
            if (Array.isArray(e))
              return void e.forEach((e) => {
                this.remove(e);
              });
            const t = i.getDotValues(e, this._fields);
            (void 0 === t && this.sparse) ||
              (Array.isArray(t)
                ? n(t, h).forEach((t) => {
                    this.tree.delete(t, e);
                  })
                : this.tree.delete(t, e));
          }
          update(e, t) {
            if (Array.isArray(e)) this.updateMultipleDocs(e);
            else {
              this.remove(e);
              try {
                this.insert(t);
              } catch (t) {
                throw (this.insert(e), t);
              }
            }
          }
          updateMultipleDocs(e) {
            let t, r;
            for (let t = 0; t < e.length; t += 1) this.remove(e[t].oldDoc);
            for (let s = 0; s < e.length; s += 1)
              try {
                this.insert(e[s].newDoc);
              } catch (e) {
                (r = e), (t = s);
                break;
              }
            if (r) {
              for (let r = 0; r < t; r += 1) this.remove(e[r].newDoc);
              for (let t = 0; t < e.length; t += 1) this.insert(e[t].oldDoc);
              throw r;
            }
          }
          revertUpdate(e, t) {
            const r = [];
            Array.isArray(e)
              ? (e.forEach((e) => {
                  r.push({ oldDoc: e.newDoc, newDoc: e.oldDoc });
                }),
                this.update(r))
              : this.update(t, e);
          }
          getMatching(e) {
            if (Array.isArray(e)) {
              const t = {},
                r = [];
              return (
                e.forEach((e) => {
                  this.getMatching(e).forEach((e) => {
                    t[e._id] = e;
                  });
                }),
                Object.keys(t).forEach((e) => {
                  r.push(t[e]);
                }),
                r
              );
            }
            return this.tree.search(e);
          }
          getBetweenBounds(e) {
            return this.tree.betweenBounds(e);
          }
          getAll() {
            const e = [];
            return (
              this.tree.executeOnEveryNode((t) => {
                e.push(...t.data);
              }),
              e
            );
          }
        };
      },
      4191: (e) => {
        const t = (e) => "object" == typeof e && null !== e,
          r = (e) =>
            t(e) && "[object Date]" === Object.prototype.toString.call(e);
        (e.exports.uniq = (e, t) =>
          t ? [...new Map(e.map((e) => [t(e), e])).values()] : [...new Set(e)]),
          (e.exports.isDate = r),
          (e.exports.isRegExp = (e) =>
            t(e) && "[object RegExp]" === Object.prototype.toString.call(e)),
          (e.exports.pick = (e, t) =>
            t.reduce(
              (t, r) => (
                e &&
                  Object.prototype.hasOwnProperty.call(e, r) &&
                  (t[r] = e[r]),
                t
              ),
              {},
            )),
          (e.exports.filterIndexNames =
            (e) =>
            ([t, s]) =>
              !(
                "string" != typeof s &&
                "number" != typeof s &&
                "boolean" != typeof s &&
                !r(s) &&
                null !== s
              ) && e.includes(t));
      },
      4277: (e, t, r) => {
        const s = r(4736);
        e.exports = class {
          constructor() {
            (this.ready = !1),
              (this.queue = new s()),
              (this.buffer = null),
              (this._triggerBuffer = null),
              this.resetBuffer();
          }
          pushAsync(e, t = !1) {
            return this.ready || t
              ? this.queue.waterfall(e)()
              : this.buffer.waterfall(e)();
          }
          processBuffer() {
            (this.ready = !0),
              this._triggerBuffer(),
              this.queue.waterfall(() => this.buffer.guardian);
          }
          resetBuffer() {
            (this.buffer = new s()),
              this.buffer.chain(
                new Promise((e) => {
                  this._triggerBuffer = e;
                }),
              ),
              this.ready && this._triggerBuffer();
          }
        };
      },
      4434: (e) => {
        "use strict";
        e.exports = require("events");
      },
      4736: (e) => {
        e.exports = class {
          constructor() {
            this.guardian = Promise.resolve();
          }
          waterfall(e) {
            return (...t) => (
              (this.guardian = this.guardian.then(() =>
                e(...t).then(
                  (e) => ({ error: !1, result: e }),
                  (e) => ({ error: !0, result: e }),
                ),
              )),
              this.guardian.then(({ error: e, result: t }) =>
                e ? Promise.reject(t) : Promise.resolve(t),
              )
            );
          }
          chain(e) {
            return this.waterfall(() => e)();
          }
        };
      },
      4756: (e) => {
        "use strict";
        e.exports = require("tls");
      },
      5145: (e, t, r) => {
        const s = r(9896);
        e.exports = (e, t = "") => {
          s.existsSync(e) || s.writeFileSync(e, t, "utf8");
        };
      },
      5175: (e, t, r) => {
        const s = r(2203),
          i = r(3557),
          { Buffer: n } = r(181);
        class o extends s.Transform {
          constructor(e) {
            super(e),
              (e = e || {}),
              (this._readableState.objectMode = !0),
              (this._lineBuffer = []),
              (this._keepEmptyLines = e.keepEmptyLines || !1),
              (this._lastChunkEndedWithCR = !1),
              this.once("pipe", (e) => {
                !this.encoding &&
                  e instanceof s.Readable &&
                  (this.encoding = e._readableState.encoding);
              });
          }
          _transform(e, t, r) {
            (t = t || "utf8"),
              n.isBuffer(e) &&
                ("buffer" === t
                  ? ((e = e.toString()), (t = "utf8"))
                  : (e = e.toString(t))),
              (this._chunkEncoding = t);
            const s = e.split(/\r\n|[\n\v\f\r\x85\u2028\u2029]/g);
            this._lastChunkEndedWithCR && "\n" === e[0] && s.shift(),
              this._lineBuffer.length > 0 &&
                ((this._lineBuffer[this._lineBuffer.length - 1] += s[0]),
                s.shift()),
              (this._lastChunkEndedWithCR = "\r" === e[e.length - 1]),
              (this._lineBuffer = this._lineBuffer.concat(s)),
              this._pushBuffer(t, 1, r);
          }
          _pushBuffer(e, t, r) {
            for (; this._lineBuffer.length > t; ) {
              const s = this._lineBuffer.shift();
              if (
                (this._keepEmptyLines || s.length > 0) &&
                !this.push(this._reencode(s, e))
              )
                return void i.setImmediate(() => {
                  this._pushBuffer(e, t, r);
                });
            }
            r();
          }
          _flush(e) {
            this._pushBuffer(this._chunkEncoding, 0, e);
          }
          _reencode(e, t) {
            return this.encoding && this.encoding !== t
              ? n.from(e, t).toString(this.encoding)
              : this.encoding
                ? e
                : n.from(e, t);
          }
        }
        e.exports = (e, t) => {
          if (!e) throw new Error("expected readStream");
          if (!e.readable) throw new Error("readStream must be readable");
          const r = new o(t);
          return e.pipe(r), r;
        };
      },
      5237: (e, t, r) => {
        const s = r(6928),
          i = r(8611),
          n = r(5866),
          o = r(8940),
          a = r(6801),
          {
            cleanOldestFileInFolder: h,
            createArchive: c,
            getFolderSize: l,
            getFileSize: d,
            createFileIfNotExists: f,
            createFolderIfNotExists: u,
            mapDataToMessage: p,
          } = r(1799);
        let y = !1,
          m = [];
        const _ = s.resolve(__dirname, "./monitoring.db");
        f(_);
        const g = s.resolve(__dirname, "./logs");
        u(g);
        const b = s.resolve(__dirname, "./index.html");
        let w = new n({ filename: _, autoload: !0 }),
          v = [];
        const x = o(() => {
            d(_) < 10485.76 ||
              ((y = !0),
              c(_, g),
              w.dropDatabase(),
              (w = new n({ filename: _, autoload: !0 })),
              (y = !1));
          }, 500),
          k = o(() => {
            l(g) < 31457.28 || h(g);
          }, 500),
          S = async (e) => {
            if (e && e.time) {
              if (y) return m.push(e), e;
              m.length && (m.forEach(S), (m = [])),
                x(),
                k(),
                await w.insertAsync(e),
                v.forEach((t) => {
                  const r = p(e);
                  t.send(r);
                });
            }
          };
        e.exports = {
          useMonitoring: (e) => {
            const t = i.createServer(),
              r = new a.Server({ server: t });
            e.get("/analytics", (e, t, r) => {
              t.sendFile(b, (e) => {
                e && r(e);
              });
            }),
              e.get("/logs", async (e, t) => {
                if (!e.query.filter) return t.json([]);
                const r = JSON.parse(e.query.filter),
                  s = (await w.findAsync(r).execAsync()).map((e) => ({
                    time: e.time,
                    text: JSON.stringify(e),
                  }));
                t.json(s);
              }),
              r.on("connection", (e) => {
                v.push(e),
                  e.on("close", () => {
                    v.filter((t) => t !== e);
                  });
              }),
              t.listen(3001, () => {
                console.log(
                  "Monitoring server running at http://localhost:3001",
                );
              });
          },
          insert: S,
        };
      },
      5387: (e, t, r) => {
        const { uniq: s, isDate: i, isRegExp: n } = r(4191),
          o = (e, t) => {
            if (
              ("number" == typeof e && (e = e.toString()),
              !(
                "$" !== e[0] ||
                ("$$date" === e && "number" == typeof t) ||
                ("$$deleted" === e && !0 === t) ||
                "$$indexCreated" === e ||
                "$$indexRemoved" === e
              ))
            )
              throw new Error("Field names cannot begin with the $ character");
            if (-1 !== e.indexOf("."))
              throw new Error("Field names cannot contain a .");
          },
          a = (e) => {
            if (
              (Array.isArray(e) &&
                e.forEach((e) => {
                  a(e);
                }),
              "object" == typeof e && null !== e)
            )
              for (const t in e)
                Object.prototype.hasOwnProperty.call(e, t) &&
                  (o(t, e[t]), a(e[t]));
          };
        function h(e, t) {
          if (
            "boolean" == typeof e ||
            "number" == typeof e ||
            "string" == typeof e ||
            null === e ||
            i(e)
          )
            return e;
          if (Array.isArray(e)) return e.map((e) => h(e, t));
          if ("object" == typeof e) {
            const r = {};
            for (const s in e)
              Object.prototype.hasOwnProperty.call(e, s) &&
                (!t || ("$" !== s[0] && -1 === s.indexOf("."))) &&
                (r[s] = h(e[s], t));
            return r;
          }
        }
        const c = (e) =>
            "boolean" == typeof e ||
            "number" == typeof e ||
            "string" == typeof e ||
            null === e ||
            i(e) ||
            Array.isArray(e),
          l = (e, t) => (e < t ? -1 : e > t ? 1 : 0),
          d = (e, t) => {
            const r = Math.min(e.length, t.length);
            for (let s = 0; s < r; s += 1) {
              const r = f(e[s], t[s]);
              if (0 !== r) return r;
            }
            return l(e.length, t.length);
          },
          f = (e, t, r) => {
            const s = r || l;
            if (void 0 === e) return void 0 === t ? 0 : -1;
            if (void 0 === t) return 1;
            if (null === e) return null === t ? 0 : -1;
            if (null === t) return 1;
            if ("number" == typeof e)
              return "number" == typeof t ? l(e, t) : -1;
            if ("number" == typeof t) return "number" == typeof e ? l(e, t) : 1;
            if ("string" == typeof e)
              return "string" == typeof t ? s(e, t) : -1;
            if ("string" == typeof t) return "string" == typeof e ? s(e, t) : 1;
            if ("boolean" == typeof e)
              return "boolean" == typeof t ? l(e, t) : -1;
            if ("boolean" == typeof t)
              return "boolean" == typeof e ? l(e, t) : 1;
            if (i(e)) return i(t) ? l(e.getTime(), t.getTime()) : -1;
            if (i(t)) return i(e) ? l(e.getTime(), t.getTime()) : 1;
            if (Array.isArray(e)) return Array.isArray(t) ? d(e, t) : -1;
            if (Array.isArray(t)) return Array.isArray(e) ? d(e, t) : 1;
            const n = Object.keys(e).sort(),
              o = Object.keys(t).sort();
            for (let r = 0; r < Math.min(n.length, o.length); r += 1) {
              const s = f(e[n[r]], t[o[r]]);
              if (0 !== s) return s;
            }
            return l(n.length, o.length);
          },
          u =
            (e, t = !1) =>
            (r, s, i) => {
              const n = (r, s, i) => {
                const o = "string" == typeof s ? s.split(".") : s;
                if (1 === o.length) e(r, s, i);
                else {
                  if (void 0 === r[o[0]]) {
                    if (t) return;
                    r[o[0]] = {};
                  }
                  n(r[o[0]], o.slice(1), i);
                }
              };
              return n(r, s, i);
            },
          p = (e, t, r) => {
            if (
              (Object.prototype.hasOwnProperty.call(e, t) || (e[t] = []),
              !Array.isArray(e[t]))
            )
              throw new Error("Can't $addToSet an element on non-array values");
            if (null !== r && "object" == typeof r && r.$each) {
              if (Object.keys(r).length > 1)
                throw new Error(
                  "Can't use another field in conjunction with $each",
                );
              if (!Array.isArray(r.$each))
                throw new Error("$each requires an array value");
              r.$each.forEach((r) => {
                p(e, t, r);
              });
            } else {
              let s = !0;
              e[t].forEach((e) => {
                0 === f(e, r) && (s = !1);
              }),
                s && e[t].push(r);
            }
          },
          y = {
            $set: u((e, t, r) => {
              e[t] = r;
            }),
            $unset: u((e, t, r) => {
              delete e[t];
            }, !0),
            $min: u((e, t, r) => {
              (void 0 === e[t] || r < e[t]) && (e[t] = r);
            }),
            $max: u((e, t, r) => {
              (void 0 === e[t] || r > e[t]) && (e[t] = r);
            }),
            $inc: u((e, t, r) => {
              if ("number" != typeof r)
                throw new Error(`${r} must be a number`);
              if ("number" != typeof e[t]) {
                if (Object.prototype.hasOwnProperty.call(e, t))
                  throw new Error(
                    "Don't use the $inc modifier on non-number fields",
                  );
                e[t] = r;
              } else e[t] += r;
            }),
            $pull: u((e, t, r) => {
              if (!Array.isArray(e[t]))
                throw new Error("Can't $pull an element from non-array values");
              const s = e[t];
              for (let e = s.length - 1; e >= 0; e -= 1)
                x(s[e], r) && s.splice(e, 1);
            }),
            $pop: u((e, t, r) => {
              if (!Array.isArray(e[t]))
                throw new Error("Can't $pop an element from non-array values");
              if ("number" != typeof r)
                throw new Error(
                  `${r} isn't an integer, can't use it with $pop`,
                );
              0 !== r &&
                (e[t] = r > 0 ? e[t].slice(0, e[t].length - 1) : e[t].slice(1));
            }),
            $addToSet: u(p),
            $push: u((e, t, r) => {
              if (
                (Object.prototype.hasOwnProperty.call(e, t) || (e[t] = []),
                !Array.isArray(e[t]))
              )
                throw new Error("Can't $push an element on non-array values");
              if (
                (null !== r &&
                  "object" == typeof r &&
                  r.$slice &&
                  void 0 === r.$each &&
                  (r.$each = []),
                null !== r && "object" == typeof r && r.$each)
              ) {
                if (
                  Object.keys(r).length >= 3 ||
                  (2 === Object.keys(r).length && void 0 === r.$slice)
                )
                  throw new Error(
                    "Can only use $slice in cunjunction with $each when $push to array",
                  );
                if (!Array.isArray(r.$each))
                  throw new Error("$each requires an array value");
                if (
                  (r.$each.forEach((r) => {
                    e[t].push(r);
                  }),
                  void 0 === r.$slice || "number" != typeof r.$slice)
                )
                  return;
                if (0 === r.$slice) e[t] = [];
                else {
                  let s, i;
                  const n = e[t].length;
                  r.$slice < 0
                    ? ((s = Math.max(0, n + r.$slice)), (i = n))
                    : r.$slice > 0 && ((s = 0), (i = Math.min(n, r.$slice))),
                    (e[t] = e[t].slice(s, i));
                }
              } else e[t].push(r);
            }),
          },
          m = (e, t) => {
            const r = "string" == typeof t ? t.split(".") : t;
            if (e) {
              if (0 === r.length) return e;
              if (1 === r.length) return e[r[0]];
              if (Array.isArray(e[r[0]])) {
                const t = parseInt(r[1], 10);
                return "number" != typeof t || isNaN(t)
                  ? e[r[0]].map((e) => m(e, r.slice(1)))
                  : m(e[r[0]][t], r.slice(2));
              }
              return m(e[r[0]], r.slice(1));
            }
          },
          _ = (e, t) => {
            if (
              null === e ||
              "string" == typeof e ||
              "boolean" == typeof e ||
              "number" == typeof e ||
              null === t ||
              "string" == typeof t ||
              "boolean" == typeof t ||
              "number" == typeof t
            )
              return e === t;
            if (i(e) || i(t))
              return i(e) && i(t) && e.getTime() === t.getTime();
            if (
              ((!Array.isArray(e) || !Array.isArray(t)) &&
                (Array.isArray(e) || Array.isArray(t))) ||
              void 0 === e ||
              void 0 === t
            )
              return !1;
            let r, s;
            try {
              (r = Object.keys(e)), (s = Object.keys(t));
            } catch (e) {
              return !1;
            }
            if (r.length !== s.length) return !1;
            for (const i of r) {
              if (-1 === s.indexOf(i)) return !1;
              if (!_(e[i], t[i])) return !1;
            }
            return !0;
          },
          g = (e, t) =>
            !(
              "string" != typeof e &&
              "number" != typeof e &&
              !i(e) &&
              "string" != typeof t &&
              "number" != typeof t &&
              !i(t)
            ) && typeof e == typeof t,
          b = {
            $lt: (e, t) => g(e, t) && e < t,
            $lte: (e, t) => g(e, t) && e <= t,
            $gt: (e, t) => g(e, t) && e > t,
            $gte: (e, t) => g(e, t) && e >= t,
            $ne: (e, t) => void 0 === e || !_(e, t),
            $in: (e, t) => {
              if (!Array.isArray(t))
                throw new Error("$in operator called with a non-array");
              for (const r of t) if (_(e, r)) return !0;
              return !1;
            },
            $nin: (e, t) => {
              if (!Array.isArray(t))
                throw new Error("$nin operator called with a non-array");
              return !b.$in(e, t);
            },
            $regex: (e, t) => {
              if (!n(t))
                throw new Error(
                  "$regex operator called with non regular expression",
                );
              return "string" == typeof e && t.test(e);
            },
            $exists: (e, t) => ((t = !(!t && "" !== t)), void 0 === e ? !t : t),
            $size: (e, t) => {
              if (!Array.isArray(e)) return !1;
              if (t % 1 != 0)
                throw new Error("$size operator called without an integer");
              return e.length === t;
            },
            $elemMatch: (e, t) => !!Array.isArray(e) && e.some((e) => x(e, t)),
          },
          w = { $size: !0, $elemMatch: !0 },
          v = {
            $or: (e, t) => {
              if (!Array.isArray(t))
                throw new Error("$or operator used without an array");
              for (let r = 0; r < t.length; r += 1) if (x(e, t[r])) return !0;
              return !1;
            },
            $and: (e, t) => {
              if (!Array.isArray(t))
                throw new Error("$and operator used without an array");
              for (let r = 0; r < t.length; r += 1) if (!x(e, t[r])) return !1;
              return !0;
            },
            $not: (e, t) => !x(e, t),
            $where: (e, t) => {
              if ("function" != typeof t)
                throw new Error("$where operator used without a function");
              const r = t.call(e);
              if ("boolean" != typeof r)
                throw new Error("$where function must return boolean");
              return r;
            },
          },
          x = (e, t) => {
            if (c(e) || c(t)) return k({ needAKey: e }, "needAKey", t);
            for (const r in t)
              if (Object.prototype.hasOwnProperty.call(t, r)) {
                const s = t[r];
                if ("$" === r[0]) {
                  if (!v[r]) throw new Error(`Unknown logical operator ${r}`);
                  if (!v[r](e, s)) return !1;
                } else if (!k(e, r, s)) return !1;
              }
            return !0;
          };
        function k(e, t, r, s) {
          const i = m(e, t);
          if (Array.isArray(i) && !s) {
            if (Array.isArray(r)) return k(e, t, r, !0);
            if (null !== r && "object" == typeof r && !n(r))
              for (const s in r)
                if (Object.prototype.hasOwnProperty.call(r, s) && w[s])
                  return k(e, t, r, !0);
            for (const e of i) if (k({ k: e }, "k", r)) return !0;
            return !1;
          }
          if (
            null !== r &&
            "object" == typeof r &&
            !n(r) &&
            !Array.isArray(r)
          ) {
            const e = Object.keys(r),
              t = e.map((e) => e[0]),
              s = t.filter((e) => "$" === e);
            if (0 !== s.length && s.length !== t.length)
              throw new Error("You cannot mix operators and normal fields");
            if (s.length > 0) {
              for (const t of e) {
                if (!b[t]) throw new Error(`Unknown comparison function ${t}`);
                if (!b[t](i, r[t])) return !1;
              }
              return !0;
            }
          }
          return n(r) ? b.$regex(i, r) : _(i, r);
        }
        (e.exports.serialize = (e) =>
          JSON.stringify(e, function (e, t) {
            if ((o(e, t), void 0 !== t))
              return null === t
                ? null
                : "function" == typeof this[e].getTime
                  ? { $$date: this[e].getTime() }
                  : t;
          })),
          (e.exports.deserialize = (e) =>
            JSON.parse(e, function (e, t) {
              return "$$date" === e
                ? new Date(t)
                : "string" == typeof t ||
                    "number" == typeof t ||
                    "boolean" == typeof t ||
                    null === t
                  ? t
                  : t && t.$$date
                    ? t.$$date
                    : t;
            })),
          (e.exports.deepCopy = h),
          (e.exports.checkObject = a),
          (e.exports.isPrimitiveType = c),
          (e.exports.modify = (e, t) => {
            const r = Object.keys(t),
              i = r.map((e) => e[0]),
              n = i.filter((e) => "$" === e);
            let o, c;
            if (-1 !== r.indexOf("_id") && t._id !== e._id)
              throw new Error("You cannot change a document's _id");
            if (0 !== n.length && n.length !== i.length)
              throw new Error("You cannot mix modifiers and normal fields");
            if (
              (0 === n.length
                ? ((o = h(t)), (o._id = e._id))
                : ((c = s(r)),
                  (o = h(e)),
                  c.forEach((e) => {
                    if (!y[e]) throw new Error(`Unknown modifier ${e}`);
                    if ("object" != typeof t[e])
                      throw new Error(
                        `Modifier ${e}'s argument must be an object`,
                      );
                    Object.keys(t[e]).forEach((r) => {
                      y[e](o, r, t[e][r]);
                    });
                  })),
              a(o),
              e._id !== o._id)
            )
              throw new Error("You can't change a document's _id");
            return o;
          }),
          (e.exports.getDotValue = m),
          (e.exports.getDotValues = (e, t) => {
            if (!Array.isArray(t)) throw new Error("fields must be an Array");
            if (t.length > 1) {
              const r = {};
              for (const s of t) r[s] = m(e, s);
              return r;
            }
            return m(e, t[0]);
          }),
          (e.exports.match = x),
          (e.exports.areThingsEqual = _),
          (e.exports.compareThings = f);
      },
      5403: (e, t, r) => {
        const s = r(9896);
        e.exports = (e) => {
          s.existsSync(e) || s.mkdirSync(e);
        };
      },
      5659: (e, t, r) => {
        "use strict";
        const { kForOnEventAttribute: s, kListener: i } = r(6832),
          n = Symbol("kCode"),
          o = Symbol("kData"),
          a = Symbol("kError"),
          h = Symbol("kMessage"),
          c = Symbol("kReason"),
          l = Symbol("kTarget"),
          d = Symbol("kType"),
          f = Symbol("kWasClean");
        class u {
          constructor(e) {
            (this[l] = null), (this[d] = e);
          }
          get target() {
            return this[l];
          }
          get type() {
            return this[d];
          }
        }
        Object.defineProperty(u.prototype, "target", { enumerable: !0 }),
          Object.defineProperty(u.prototype, "type", { enumerable: !0 });
        class p extends u {
          constructor(e, t = {}) {
            super(e),
              (this[n] = void 0 === t.code ? 0 : t.code),
              (this[c] = void 0 === t.reason ? "" : t.reason),
              (this[f] = void 0 !== t.wasClean && t.wasClean);
          }
          get code() {
            return this[n];
          }
          get reason() {
            return this[c];
          }
          get wasClean() {
            return this[f];
          }
        }
        Object.defineProperty(p.prototype, "code", { enumerable: !0 }),
          Object.defineProperty(p.prototype, "reason", { enumerable: !0 }),
          Object.defineProperty(p.prototype, "wasClean", { enumerable: !0 });
        class y extends u {
          constructor(e, t = {}) {
            super(e),
              (this[a] = void 0 === t.error ? null : t.error),
              (this[h] = void 0 === t.message ? "" : t.message);
          }
          get error() {
            return this[a];
          }
          get message() {
            return this[h];
          }
        }
        Object.defineProperty(y.prototype, "error", { enumerable: !0 }),
          Object.defineProperty(y.prototype, "message", { enumerable: !0 });
        class m extends u {
          constructor(e, t = {}) {
            super(e), (this[o] = void 0 === t.data ? null : t.data);
          }
          get data() {
            return this[o];
          }
        }
        Object.defineProperty(m.prototype, "data", { enumerable: !0 });
        const _ = {
          addEventListener(e, t, r = {}) {
            for (const n of this.listeners(e))
              if (!r[s] && n[i] === t && !n[s]) return;
            let n;
            if ("message" === e)
              n = function (e, r) {
                const s = new m("message", { data: r ? e : e.toString() });
                (s[l] = this), g(t, this, s);
              };
            else if ("close" === e)
              n = function (e, r) {
                const s = new p("close", {
                  code: e,
                  reason: r.toString(),
                  wasClean: this._closeFrameReceived && this._closeFrameSent,
                });
                (s[l] = this), g(t, this, s);
              };
            else if ("error" === e)
              n = function (e) {
                const r = new y("error", { error: e, message: e.message });
                (r[l] = this), g(t, this, r);
              };
            else {
              if ("open" !== e) return;
              n = function () {
                const e = new u("open");
                (e[l] = this), g(t, this, e);
              };
            }
            (n[s] = !!r[s]),
              (n[i] = t),
              r.once ? this.once(e, n) : this.on(e, n);
          },
          removeEventListener(e, t) {
            for (const r of this.listeners(e))
              if (r[i] === t && !r[s]) {
                this.removeListener(e, r);
                break;
              }
          },
        };
        function g(e, t, r) {
          "object" == typeof e && e.handleEvent
            ? e.handleEvent.call(e, r)
            : e.call(t, r);
        }
        e.exports = {
          CloseEvent: p,
          ErrorEvent: y,
          Event: u,
          EventTarget: _,
          MessageEvent: m,
        };
      },
      5692: (e) => {
        "use strict";
        e.exports = require("https");
      },
      5866: (e, t, r) => {
        const s = r(2119);
        e.exports = s;
      },
      6220: (e, t, r) => {
        "use strict";
        const { Duplex: s } = r(2203),
          { randomFillSync: i } = r(6982),
          n = r(4029),
          { EMPTY_BUFFER: o, kWebSocket: a, NOOP: h } = r(6832),
          { isBlob: c, isValidStatusCode: l } = r(9714),
          { mask: d, toBuffer: f } = r(1460),
          u = Symbol("kByteLength"),
          p = Buffer.alloc(4),
          y = 8192;
        let m,
          _ = y;
        class g {
          constructor(e, t, r) {
            (this._extensions = t || {}),
              r &&
                ((this._generateMask = r),
                (this._maskBuffer = Buffer.alloc(4))),
              (this._socket = e),
              (this._firstFragment = !0),
              (this._compress = !1),
              (this._bufferedBytes = 0),
              (this._queue = []),
              (this._state = 0),
              (this.onerror = h),
              (this[a] = void 0);
          }
          static frame(e, t) {
            let r,
              s,
              n = !1,
              o = 2,
              a = !1;
            t.mask &&
              ((r = t.maskBuffer || p),
              t.generateMask
                ? t.generateMask(r)
                : (_ === y &&
                    (void 0 === m && (m = Buffer.alloc(y)),
                    i(m, 0, y),
                    (_ = 0)),
                  (r[0] = m[_++]),
                  (r[1] = m[_++]),
                  (r[2] = m[_++]),
                  (r[3] = m[_++])),
              (a = 0 === (r[0] | r[1] | r[2] | r[3])),
              (o = 6)),
              "string" == typeof e
                ? (s =
                    (t.mask && !a) || void 0 === t[u]
                      ? (e = Buffer.from(e)).length
                      : t[u])
                : ((s = e.length), (n = t.mask && t.readOnly && !a));
            let h = s;
            s >= 65536
              ? ((o += 8), (h = 127))
              : s > 125 && ((o += 2), (h = 126));
            const c = Buffer.allocUnsafe(n ? s + o : o);
            return (
              (c[0] = t.fin ? 128 | t.opcode : t.opcode),
              t.rsv1 && (c[0] |= 64),
              (c[1] = h),
              126 === h
                ? c.writeUInt16BE(s, 2)
                : 127 === h && ((c[2] = c[3] = 0), c.writeUIntBE(s, 4, 6)),
              t.mask
                ? ((c[1] |= 128),
                  (c[o - 4] = r[0]),
                  (c[o - 3] = r[1]),
                  (c[o - 2] = r[2]),
                  (c[o - 1] = r[3]),
                  a
                    ? [c, e]
                    : n
                      ? (d(e, r, c, o, s), [c])
                      : (d(e, r, e, 0, s), [c, e]))
                : [c, e]
            );
          }
          close(e, t, r, s) {
            let i;
            if (void 0 === e) i = o;
            else {
              if ("number" != typeof e || !l(e))
                throw new TypeError(
                  "First argument must be a valid error code number",
                );
              if (void 0 !== t && t.length) {
                const r = Buffer.byteLength(t);
                if (r > 123)
                  throw new RangeError(
                    "The message must not be greater than 123 bytes",
                  );
                (i = Buffer.allocUnsafe(2 + r)),
                  i.writeUInt16BE(e, 0),
                  "string" == typeof t ? i.write(t, 2) : i.set(t, 2);
              } else (i = Buffer.allocUnsafe(2)), i.writeUInt16BE(e, 0);
            }
            const n = {
              [u]: i.length,
              fin: !0,
              generateMask: this._generateMask,
              mask: r,
              maskBuffer: this._maskBuffer,
              opcode: 8,
              readOnly: !1,
              rsv1: !1,
            };
            0 !== this._state
              ? this.enqueue([this.dispatch, i, !1, n, s])
              : this.sendFrame(g.frame(i, n), s);
          }
          ping(e, t, r) {
            let s, i;
            if (
              ("string" == typeof e
                ? ((s = Buffer.byteLength(e)), (i = !1))
                : c(e)
                  ? ((s = e.size), (i = !1))
                  : ((s = (e = f(e)).length), (i = f.readOnly)),
              s > 125)
            )
              throw new RangeError(
                "The data size must not be greater than 125 bytes",
              );
            const n = {
              [u]: s,
              fin: !0,
              generateMask: this._generateMask,
              mask: t,
              maskBuffer: this._maskBuffer,
              opcode: 9,
              readOnly: i,
              rsv1: !1,
            };
            c(e)
              ? 0 !== this._state
                ? this.enqueue([this.getBlobData, e, !1, n, r])
                : this.getBlobData(e, !1, n, r)
              : 0 !== this._state
                ? this.enqueue([this.dispatch, e, !1, n, r])
                : this.sendFrame(g.frame(e, n), r);
          }
          pong(e, t, r) {
            let s, i;
            if (
              ("string" == typeof e
                ? ((s = Buffer.byteLength(e)), (i = !1))
                : c(e)
                  ? ((s = e.size), (i = !1))
                  : ((s = (e = f(e)).length), (i = f.readOnly)),
              s > 125)
            )
              throw new RangeError(
                "The data size must not be greater than 125 bytes",
              );
            const n = {
              [u]: s,
              fin: !0,
              generateMask: this._generateMask,
              mask: t,
              maskBuffer: this._maskBuffer,
              opcode: 10,
              readOnly: i,
              rsv1: !1,
            };
            c(e)
              ? 0 !== this._state
                ? this.enqueue([this.getBlobData, e, !1, n, r])
                : this.getBlobData(e, !1, n, r)
              : 0 !== this._state
                ? this.enqueue([this.dispatch, e, !1, n, r])
                : this.sendFrame(g.frame(e, n), r);
          }
          send(e, t, r) {
            const s = this._extensions[n.extensionName];
            let i,
              o,
              a = t.binary ? 2 : 1,
              h = t.compress;
            "string" == typeof e
              ? ((i = Buffer.byteLength(e)), (o = !1))
              : c(e)
                ? ((i = e.size), (o = !1))
                : ((i = (e = f(e)).length), (o = f.readOnly)),
              this._firstFragment
                ? ((this._firstFragment = !1),
                  h &&
                    s &&
                    s.params[
                      s._isServer
                        ? "server_no_context_takeover"
                        : "client_no_context_takeover"
                    ] &&
                    (h = i >= s._threshold),
                  (this._compress = h))
                : ((h = !1), (a = 0)),
              t.fin && (this._firstFragment = !0);
            const l = {
              [u]: i,
              fin: t.fin,
              generateMask: this._generateMask,
              mask: t.mask,
              maskBuffer: this._maskBuffer,
              opcode: a,
              readOnly: o,
              rsv1: h,
            };
            c(e)
              ? 0 !== this._state
                ? this.enqueue([this.getBlobData, e, this._compress, l, r])
                : this.getBlobData(e, this._compress, l, r)
              : 0 !== this._state
                ? this.enqueue([this.dispatch, e, this._compress, l, r])
                : this.dispatch(e, this._compress, l, r);
          }
          getBlobData(e, t, r, s) {
            (this._bufferedBytes += r[u]),
              (this._state = 2),
              e
                .arrayBuffer()
                .then((e) => {
                  if (this._socket.destroyed) {
                    const e = new Error(
                      "The socket was closed while the blob was being read",
                    );
                    return void process.nextTick(b, this, e, s);
                  }
                  this._bufferedBytes -= r[u];
                  const i = f(e);
                  t
                    ? this.dispatch(i, t, r, s)
                    : ((this._state = 0),
                      this.sendFrame(g.frame(i, r), s),
                      this.dequeue());
                })
                .catch((e) => {
                  process.nextTick(w, this, e, s);
                });
          }
          dispatch(e, t, r, s) {
            if (!t) return void this.sendFrame(g.frame(e, r), s);
            const i = this._extensions[n.extensionName];
            (this._bufferedBytes += r[u]),
              (this._state = 1),
              i.compress(e, r.fin, (e, t) => {
                this._socket.destroyed
                  ? b(
                      this,
                      new Error(
                        "The socket was closed while data was being compressed",
                      ),
                      s,
                    )
                  : ((this._bufferedBytes -= r[u]),
                    (this._state = 0),
                    (r.readOnly = !1),
                    this.sendFrame(g.frame(t, r), s),
                    this.dequeue());
              });
          }
          dequeue() {
            for (; 0 === this._state && this._queue.length; ) {
              const e = this._queue.shift();
              (this._bufferedBytes -= e[3][u]),
                Reflect.apply(e[0], this, e.slice(1));
            }
          }
          enqueue(e) {
            (this._bufferedBytes += e[3][u]), this._queue.push(e);
          }
          sendFrame(e, t) {
            2 === e.length
              ? (this._socket.cork(),
                this._socket.write(e[0]),
                this._socket.write(e[1], t),
                this._socket.uncork())
              : this._socket.write(e[0], t);
          }
        }
        function b(e, t, r) {
          "function" == typeof r && r(t);
          for (let r = 0; r < e._queue.length; r++) {
            const s = e._queue[r],
              i = s[s.length - 1];
            "function" == typeof i && i(t);
          }
        }
        function w(e, t, r) {
          b(e, t, r), e.onerror(t);
        }
        e.exports = g;
      },
      6348: (e, t, r) => {
        const s = r(9896);
        e.exports = (e) => s.statSync(e).size;
      },
      6389: (e, t, r) => {
        const s = r(3629),
          i = r(7864);
        class n {
          constructor(e) {
            this.tree = new o(e);
          }
          checkIsAVLT() {
            this.tree.checkIsAVLT();
          }
          insert(e, t) {
            const r = this.tree.insert(e, t);
            r && (this.tree = r);
          }
          delete(e, t) {
            const r = this.tree.delete(e, t);
            r && (this.tree = r);
          }
        }
        class o extends s {
          constructor(e) {
            super(),
              (e = e || {}),
              (this.left = null),
              (this.right = null),
              (this.parent = void 0 !== e.parent ? e.parent : null),
              Object.prototype.hasOwnProperty.call(e, "key") &&
                (this.key = e.key),
              (this.data = Object.prototype.hasOwnProperty.call(e, "value")
                ? [e.value]
                : []),
              (this.unique = e.unique || !1),
              (this.compareKeys =
                e.compareKeys || i.defaultCompareKeysFunction),
              (this.checkValueEquality =
                e.checkValueEquality || i.defaultCheckValueEquality);
          }
          checkHeightCorrect() {
            if (!Object.prototype.hasOwnProperty.call(this, "key")) return;
            if (this.left && void 0 === this.left.height)
              throw new Error("Undefined height for node " + this.left.key);
            if (this.right && void 0 === this.right.height)
              throw new Error("Undefined height for node " + this.right.key);
            if (void 0 === this.height)
              throw new Error("Undefined height for node " + this.key);
            const e = this.left ? this.left.height : 0,
              t = this.right ? this.right.height : 0;
            if (this.height !== 1 + Math.max(e, t))
              throw new Error("Height constraint failed for node " + this.key);
            this.left && this.left.checkHeightCorrect(),
              this.right && this.right.checkHeightCorrect();
          }
          balanceFactor() {
            return (
              (this.left ? this.left.height : 0) -
              (this.right ? this.right.height : 0)
            );
          }
          checkBalanceFactors() {
            if (Math.abs(this.balanceFactor()) > 1)
              throw new Error("Tree is unbalanced at node " + this.key);
            this.left && this.left.checkBalanceFactors(),
              this.right && this.right.checkBalanceFactors();
          }
          checkIsAVLT() {
            super.checkIsBST(),
              this.checkHeightCorrect(),
              this.checkBalanceFactors();
          }
          rightRotation() {
            const e = this,
              t = this.left;
            if (!t) return e;
            const r = t.right;
            e.parent
              ? ((t.parent = e.parent),
                e.parent.left === e
                  ? (e.parent.left = t)
                  : (e.parent.right = t))
              : (t.parent = null),
              (t.right = e),
              (e.parent = t),
              (e.left = r),
              r && (r.parent = e);
            const s = t.left ? t.left.height : 0,
              i = r ? r.height : 0,
              n = e.right ? e.right.height : 0;
            return (
              (e.height = Math.max(i, n) + 1),
              (t.height = Math.max(s, e.height) + 1),
              t
            );
          }
          leftRotation() {
            const e = this,
              t = this.right;
            if (!t) return this;
            const r = t.left;
            e.parent
              ? ((t.parent = e.parent),
                e.parent.left === e
                  ? (e.parent.left = t)
                  : (e.parent.right = t))
              : (t.parent = null),
              (t.left = e),
              (e.parent = t),
              (e.right = r),
              r && (r.parent = e);
            const s = e.left ? e.left.height : 0,
              i = r ? r.height : 0,
              n = t.right ? t.right.height : 0;
            return (
              (e.height = Math.max(s, i) + 1),
              (t.height = Math.max(n, e.height) + 1),
              t
            );
          }
          rightTooSmall() {
            return this.balanceFactor() <= 1
              ? this
              : (this.left.balanceFactor() < 0 && this.left.leftRotation(),
                this.rightRotation());
          }
          leftTooSmall() {
            return this.balanceFactor() >= -1
              ? this
              : (this.right.balanceFactor() > 0 && this.right.rightRotation(),
                this.leftRotation());
          }
          rebalanceAlongPath(e) {
            let t,
              r,
              s = this;
            if (!Object.prototype.hasOwnProperty.call(this, "key"))
              return delete this.height, this;
            for (r = e.length - 1; r >= 0; r -= 1)
              (e[r].height =
                1 +
                Math.max(
                  e[r].left ? e[r].left.height : 0,
                  e[r].right ? e[r].right.height : 0,
                )),
                e[r].balanceFactor() > 1 &&
                  ((t = e[r].rightTooSmall()), 0 === r && (s = t)),
                e[r].balanceFactor() < -1 &&
                  ((t = e[r].leftTooSmall()), 0 === r && (s = t));
            return s;
          }
          insert(e, t) {
            const r = [];
            let s = this;
            if (!Object.prototype.hasOwnProperty.call(this, "key"))
              return (this.key = e), this.data.push(t), (this.height = 1), this;
            for (;;) {
              if (0 === s.compareKeys(s.key, e)) {
                if (s.unique) {
                  const t = new Error(
                    `Can't insert key ${JSON.stringify(e)}, it violates the unique constraint`,
                  );
                  throw ((t.key = e), (t.errorType = "uniqueViolated"), t);
                }
                return s.data.push(t), this;
              }
              if ((r.push(s), s.compareKeys(e, s.key) < 0)) {
                if (!s.left) {
                  r.push(s.createLeftChild({ key: e, value: t }));
                  break;
                }
                s = s.left;
              } else {
                if (!s.right) {
                  r.push(s.createRightChild({ key: e, value: t }));
                  break;
                }
                s = s.right;
              }
            }
            return this.rebalanceAlongPath(r);
          }
          delete(e, t) {
            const r = [];
            let s,
              i = this;
            const n = [];
            if (!Object.prototype.hasOwnProperty.call(this, "key")) return this;
            for (; 0 !== i.compareKeys(e, i.key); )
              if ((n.push(i), i.compareKeys(e, i.key) < 0)) {
                if (!i.left) return this;
                i = i.left;
              } else {
                if (!i.right) return this;
                i = i.right;
              }
            if (i.data.length > 1 && void 0 !== t)
              return (
                i.data.forEach(function (e) {
                  i.checkValueEquality(e, t) || r.push(e);
                }),
                (i.data = r),
                this
              );
            if (!i.left && !i.right)
              return i === this
                ? (delete i.key, (i.data = []), delete i.height, this)
                : (i.parent.left === i
                    ? (i.parent.left = null)
                    : (i.parent.right = null),
                  this.rebalanceAlongPath(n));
            if (!i.left || !i.right)
              return (
                (s = i.left ? i.left : i.right),
                i === this
                  ? ((s.parent = null), s)
                  : (i.parent.left === i
                      ? ((i.parent.left = s), (s.parent = i.parent))
                      : ((i.parent.right = s), (s.parent = i.parent)),
                    this.rebalanceAlongPath(n))
              );
            if ((n.push(i), (s = i.left), !s.right))
              return (
                (i.key = s.key),
                (i.data = s.data),
                (i.left = s.left),
                s.left && (s.left.parent = i),
                this.rebalanceAlongPath(n)
              );
            for (; s.right; ) n.push(s), (s = s.right);
            return (
              (i.key = s.key),
              (i.data = s.data),
              (s.parent.right = s.left),
              s.left && (s.left.parent = s.parent),
              this.rebalanceAlongPath(n)
            );
          }
        }
        (n._AVLTree = o),
          [
            "getNumberOfKeys",
            "search",
            "betweenBounds",
            "prettyPrint",
            "executeOnEveryNode",
          ].forEach(function (e) {
            n.prototype[e] = function () {
              return this.tree[e].apply(this.tree, arguments);
            };
          }),
          (e.exports = n);
      },
      6801: (e, t, r) => {
        "use strict";
        const s = r(9038);
        (s.createWebSocketStream = r(125)),
          (s.Server = r(8440)),
          (s.Receiver = r(9092)),
          (s.Sender = r(6220)),
          (s.WebSocket = s),
          (s.WebSocketServer = s.Server),
          (e.exports = s);
      },
      6832: (e) => {
        "use strict";
        const t = ["nodebuffer", "arraybuffer", "fragments"],
          r = "undefined" != typeof Blob;
        r && t.push("blob"),
          (e.exports = {
            BINARY_TYPES: t,
            EMPTY_BUFFER: Buffer.alloc(0),
            GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
            hasBlob: r,
            kForOnEventAttribute: Symbol("kIsForOnEventAttribute"),
            kListener: Symbol("kListener"),
            kStatusCode: Symbol("status-code"),
            kWebSocket: Symbol("websocket"),
            NOOP: () => {},
          });
      },
      6928: (e) => {
        "use strict";
        e.exports = require("path");
      },
      6982: (e) => {
        "use strict";
        e.exports = require("crypto");
      },
      7016: (e) => {
        "use strict";
        e.exports = require("url");
      },
      7592: (e, t, r) => {
        const s = r(6928),
          i = r(9896),
          n = r(3868);
        e.exports = (e) => {
          const t = n(e);
          if (!t) return;
          const r = s.join(e, t);
          i.unlinkSync(r);
        };
      },
      7755: (e, t, r) => {
        "use strict";
        const { tokenChars: s } = r(9714);
        e.exports = {
          parse: function (e) {
            const t = new Set();
            let r = -1,
              i = -1,
              n = 0;
            for (; n < e.length; n++) {
              const o = e.charCodeAt(n);
              if (-1 === i && 1 === s[o]) -1 === r && (r = n);
              else if (0 === n || (32 !== o && 9 !== o)) {
                if (44 !== o)
                  throw new SyntaxError(`Unexpected character at index ${n}`);
                {
                  if (-1 === r)
                    throw new SyntaxError(`Unexpected character at index ${n}`);
                  -1 === i && (i = n);
                  const s = e.slice(r, i);
                  if (t.has(s))
                    throw new SyntaxError(
                      `The "${s}" subprotocol is duplicated`,
                    );
                  t.add(s), (r = i = -1);
                }
              } else -1 === i && -1 !== r && (i = n);
            }
            if (-1 === r || -1 !== i)
              throw new SyntaxError("Unexpected end of input");
            const o = e.slice(r, n);
            if (t.has(o))
              throw new SyntaxError(`The "${o}" subprotocol is duplicated`);
            return t.add(o), t;
          },
        };
      },
      7864: (e) => {
        const t = (e) => {
          if (0 === e) return [];
          if (1 === e) return [0];
          const r = t(e - 1),
            s = Math.floor(Math.random() * e);
          return r.splice(s, 0, e - 1), r;
        };
        (e.exports.getRandomArray = t),
          (e.exports.defaultCompareKeysFunction = (e, t) => {
            if (e < t) return -1;
            if (e > t) return 1;
            if (e === t) return 0;
            const r = new Error("Couldn't compare elements");
            throw ((r.a = e), (r.b = t), r);
          }),
          (e.exports.defaultCheckValueEquality = (e, t) => e === t);
      },
      8168: (e, t, r) => {
        "use strict";
        const { tokenChars: s } = r(9714);
        function i(e, t, r) {
          void 0 === e[t] ? (e[t] = [r]) : e[t].push(r);
        }
        e.exports = {
          format: function (e) {
            return Object.keys(e)
              .map((t) => {
                let r = e[t];
                return (
                  Array.isArray(r) || (r = [r]),
                  r
                    .map((e) =>
                      [t]
                        .concat(
                          Object.keys(e).map((t) => {
                            let r = e[t];
                            return (
                              Array.isArray(r) || (r = [r]),
                              r
                                .map((e) => (!0 === e ? t : `${t}=${e}`))
                                .join("; ")
                            );
                          }),
                        )
                        .join("; "),
                    )
                    .join(", ")
                );
              })
              .join(", ");
          },
          parse: function (e) {
            const t = Object.create(null);
            let r,
              n,
              o = Object.create(null),
              a = !1,
              h = !1,
              c = !1,
              l = -1,
              d = -1,
              f = -1,
              u = 0;
            for (; u < e.length; u++)
              if (((d = e.charCodeAt(u)), void 0 === r))
                if (-1 === f && 1 === s[d]) -1 === l && (l = u);
                else if (0 === u || (32 !== d && 9 !== d)) {
                  if (59 !== d && 44 !== d)
                    throw new SyntaxError(`Unexpected character at index ${u}`);
                  {
                    if (-1 === l)
                      throw new SyntaxError(
                        `Unexpected character at index ${u}`,
                      );
                    -1 === f && (f = u);
                    const s = e.slice(l, f);
                    44 === d
                      ? (i(t, s, o), (o = Object.create(null)))
                      : (r = s),
                      (l = f = -1);
                  }
                } else -1 === f && -1 !== l && (f = u);
              else if (void 0 === n)
                if (-1 === f && 1 === s[d]) -1 === l && (l = u);
                else if (32 === d || 9 === d) -1 === f && -1 !== l && (f = u);
                else if (59 === d || 44 === d) {
                  if (-1 === l)
                    throw new SyntaxError(`Unexpected character at index ${u}`);
                  -1 === f && (f = u),
                    i(o, e.slice(l, f), !0),
                    44 === d &&
                      (i(t, r, o), (o = Object.create(null)), (r = void 0)),
                    (l = f = -1);
                } else {
                  if (61 !== d || -1 === l || -1 !== f)
                    throw new SyntaxError(`Unexpected character at index ${u}`);
                  (n = e.slice(l, u)), (l = f = -1);
                }
              else if (h) {
                if (1 !== s[d])
                  throw new SyntaxError(`Unexpected character at index ${u}`);
                -1 === l ? (l = u) : a || (a = !0), (h = !1);
              } else if (c)
                if (1 === s[d]) -1 === l && (l = u);
                else if (34 === d && -1 !== l) (c = !1), (f = u);
                else {
                  if (92 !== d)
                    throw new SyntaxError(`Unexpected character at index ${u}`);
                  h = !0;
                }
              else if (34 === d && 61 === e.charCodeAt(u - 1)) c = !0;
              else if (-1 === f && 1 === s[d]) -1 === l && (l = u);
              else if (-1 === l || (32 !== d && 9 !== d)) {
                if (59 !== d && 44 !== d)
                  throw new SyntaxError(`Unexpected character at index ${u}`);
                {
                  if (-1 === l)
                    throw new SyntaxError(`Unexpected character at index ${u}`);
                  -1 === f && (f = u);
                  let s = e.slice(l, f);
                  a && ((s = s.replace(/\\/g, "")), (a = !1)),
                    i(o, n, s),
                    44 === d &&
                      (i(t, r, o), (o = Object.create(null)), (r = void 0)),
                    (n = void 0),
                    (l = f = -1);
                }
              } else -1 === f && (f = u);
            if (-1 === l || c || 32 === d || 9 === d)
              throw new SyntaxError("Unexpected end of input");
            -1 === f && (f = u);
            const p = e.slice(l, f);
            return (
              void 0 === r
                ? i(t, p, o)
                : (void 0 === n
                    ? i(o, p, !0)
                    : i(o, n, a ? p.replace(/\\/g, "") : p),
                  i(t, r, o)),
              t
            );
          },
        };
      },
      8440: (e, t, r) => {
        "use strict";
        const s = r(4434),
          i = r(8611),
          { Duplex: n } = r(2203),
          { createHash: o } = r(6982),
          a = r(8168),
          h = r(4029),
          c = r(7755),
          l = r(9038),
          { GUID: d, kWebSocket: f } = r(6832),
          u = /^[+/0-9A-Za-z]{22}==$/;
        function p(e) {
          (e._state = 2), e.emit("close");
        }
        function y() {
          this.destroy();
        }
        function m(e, t, r, s) {
          (r = r || i.STATUS_CODES[t]),
            (s = {
              Connection: "close",
              "Content-Type": "text/html",
              "Content-Length": Buffer.byteLength(r),
              ...s,
            }),
            e.once("finish", e.destroy),
            e.end(
              `HTTP/1.1 ${t} ${i.STATUS_CODES[t]}\r\n` +
                Object.keys(s)
                  .map((e) => `${e}: ${s[e]}`)
                  .join("\r\n") +
                "\r\n\r\n" +
                r,
            );
        }
        function _(e, t, r, s, i) {
          if (e.listenerCount("wsClientError")) {
            const s = new Error(i);
            Error.captureStackTrace(s, _), e.emit("wsClientError", s, r, t);
          } else m(r, s, i);
        }
        e.exports = class extends s {
          constructor(e, t) {
            if (
              (super(),
              (null ==
                (e = {
                  allowSynchronousEvents: !0,
                  autoPong: !0,
                  maxPayload: 104857600,
                  skipUTF8Validation: !1,
                  perMessageDeflate: !1,
                  handleProtocols: null,
                  clientTracking: !0,
                  verifyClient: null,
                  noServer: !1,
                  backlog: null,
                  server: null,
                  host: null,
                  path: null,
                  port: null,
                  WebSocket: l,
                  ...e,
                }).port &&
                !e.server &&
                !e.noServer) ||
                (null != e.port && (e.server || e.noServer)) ||
                (e.server && e.noServer))
            )
              throw new TypeError(
                'One and only one of the "port", "server", or "noServer" options must be specified',
              );
            if (
              (null != e.port
                ? ((this._server = i.createServer((e, t) => {
                    const r = i.STATUS_CODES[426];
                    t.writeHead(426, {
                      "Content-Length": r.length,
                      "Content-Type": "text/plain",
                    }),
                      t.end(r);
                  })),
                  this._server.listen(e.port, e.host, e.backlog, t))
                : e.server && (this._server = e.server),
              this._server)
            ) {
              const e = this.emit.bind(this, "connection");
              this._removeListeners = (function (e, t) {
                for (const r of Object.keys(t)) e.on(r, t[r]);
                return function () {
                  for (const r of Object.keys(t)) e.removeListener(r, t[r]);
                };
              })(this._server, {
                listening: this.emit.bind(this, "listening"),
                error: this.emit.bind(this, "error"),
                upgrade: (t, r, s) => {
                  this.handleUpgrade(t, r, s, e);
                },
              });
            }
            !0 === e.perMessageDeflate && (e.perMessageDeflate = {}),
              e.clientTracking &&
                ((this.clients = new Set()), (this._shouldEmitClose = !1)),
              (this.options = e),
              (this._state = 0);
          }
          address() {
            if (this.options.noServer)
              throw new Error('The server is operating in "noServer" mode');
            return this._server ? this._server.address() : null;
          }
          close(e) {
            if (2 === this._state)
              return (
                e &&
                  this.once("close", () => {
                    e(new Error("The server is not running"));
                  }),
                void process.nextTick(p, this)
              );
            if ((e && this.once("close", e), 1 !== this._state))
              if (
                ((this._state = 1),
                this.options.noServer || this.options.server)
              )
                this._server &&
                  (this._removeListeners(),
                  (this._removeListeners = this._server = null)),
                  this.clients && this.clients.size
                    ? (this._shouldEmitClose = !0)
                    : process.nextTick(p, this);
              else {
                const e = this._server;
                this._removeListeners(),
                  (this._removeListeners = this._server = null),
                  e.close(() => {
                    p(this);
                  });
              }
          }
          shouldHandle(e) {
            if (this.options.path) {
              const t = e.url.indexOf("?");
              if ((-1 !== t ? e.url.slice(0, t) : e.url) !== this.options.path)
                return !1;
            }
            return !0;
          }
          handleUpgrade(e, t, r, s) {
            t.on("error", y);
            const i = e.headers["sec-websocket-key"],
              n = e.headers.upgrade,
              o = +e.headers["sec-websocket-version"];
            if ("GET" !== e.method)
              return void _(this, e, t, 405, "Invalid HTTP method");
            if (void 0 === n || "websocket" !== n.toLowerCase())
              return void _(this, e, t, 400, "Invalid Upgrade header");
            if (void 0 === i || !u.test(i))
              return void _(
                this,
                e,
                t,
                400,
                "Missing or invalid Sec-WebSocket-Key header",
              );
            if (8 !== o && 13 !== o)
              return void _(
                this,
                e,
                t,
                400,
                "Missing or invalid Sec-WebSocket-Version header",
              );
            if (!this.shouldHandle(e)) return void m(t, 400);
            const l = e.headers["sec-websocket-protocol"];
            let d = new Set();
            if (void 0 !== l)
              try {
                d = c.parse(l);
              } catch (r) {
                return void _(
                  this,
                  e,
                  t,
                  400,
                  "Invalid Sec-WebSocket-Protocol header",
                );
              }
            const f = e.headers["sec-websocket-extensions"],
              p = {};
            if (this.options.perMessageDeflate && void 0 !== f) {
              const r = new h(
                this.options.perMessageDeflate,
                !0,
                this.options.maxPayload,
              );
              try {
                const e = a.parse(f);
                e[h.extensionName] &&
                  (r.accept(e[h.extensionName]), (p[h.extensionName] = r));
              } catch (r) {
                return void _(
                  this,
                  e,
                  t,
                  400,
                  "Invalid or unacceptable Sec-WebSocket-Extensions header",
                );
              }
            }
            if (this.options.verifyClient) {
              const n = {
                origin: e.headers[8 === o ? "sec-websocket-origin" : "origin"],
                secure: !(!e.socket.authorized && !e.socket.encrypted),
                req: e,
              };
              if (2 === this.options.verifyClient.length)
                return void this.options.verifyClient(n, (n, o, a, h) => {
                  if (!n) return m(t, o || 401, a, h);
                  this.completeUpgrade(p, i, d, e, t, r, s);
                });
              if (!this.options.verifyClient(n)) return m(t, 401);
            }
            this.completeUpgrade(p, i, d, e, t, r, s);
          }
          completeUpgrade(e, t, r, s, i, n, c) {
            if (!i.readable || !i.writable) return i.destroy();
            if (i[f])
              throw new Error(
                "server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration",
              );
            if (this._state > 0) return m(i, 503);
            const l = [
                "HTTP/1.1 101 Switching Protocols",
                "Upgrade: websocket",
                "Connection: Upgrade",
                `Sec-WebSocket-Accept: ${o("sha1")
                  .update(t + d)
                  .digest("base64")}`,
              ],
              u = new this.options.WebSocket(null, void 0, this.options);
            if (r.size) {
              const e = this.options.handleProtocols
                ? this.options.handleProtocols(r, s)
                : r.values().next().value;
              e && (l.push(`Sec-WebSocket-Protocol: ${e}`), (u._protocol = e));
            }
            if (e[h.extensionName]) {
              const t = e[h.extensionName].params,
                r = a.format({ [h.extensionName]: [t] });
              l.push(`Sec-WebSocket-Extensions: ${r}`), (u._extensions = e);
            }
            this.emit("headers", l, s),
              i.write(l.concat("\r\n").join("\r\n")),
              i.removeListener("error", y),
              u.setSocket(i, n, {
                allowSynchronousEvents: this.options.allowSynchronousEvents,
                maxPayload: this.options.maxPayload,
                skipUTF8Validation: this.options.skipUTF8Validation,
              }),
              this.clients &&
                (this.clients.add(u),
                u.on("close", () => {
                  this.clients.delete(u),
                    this._shouldEmitClose &&
                      !this.clients.size &&
                      process.nextTick(p, this);
                })),
              c(u, s);
          }
        };
      },
      8509: (e, t, r) => {
        const { deprecate: s } = r(9023),
          i = r(5175),
          n = r(4178),
          o = r(5387),
          a = r(1371),
          h = r(4736);
        class c {
          constructor(e) {
            if (
              ((this.db = e.db),
              (this.inMemoryOnly = this.db.inMemoryOnly),
              (this.filename = this.db.filename),
              (this.corruptAlertThreshold =
                void 0 !== e.corruptAlertThreshold
                  ? e.corruptAlertThreshold
                  : 0.1),
              (this.modes =
                void 0 !== e.modes ? e.modes : { fileMode: 420, dirMode: 493 }),
              void 0 === this.modes.fileMode && (this.modes.fileMode = 420),
              void 0 === this.modes.dirMode && (this.modes.dirMode = 493),
              !this.inMemoryOnly &&
                this.filename &&
                "~" === this.filename.charAt(this.filename.length - 1))
            )
              throw new Error(
                "The datafile name can't end with a ~, which is reserved for crash safe backup files",
              );
            if (e.afterSerialization && !e.beforeDeserialization)
              throw new Error(
                "Serialization hook defined but deserialization hook undefined, cautiously refusing to start NeDB to prevent dataloss",
              );
            if (!e.afterSerialization && e.beforeDeserialization)
              throw new Error(
                "Serialization hook undefined but deserialization hook defined, cautiously refusing to start NeDB to prevent dataloss",
              );
            (this.afterSerialization = async (t) =>
              (e.afterSerialization || ((e) => e))(t)),
              (this.beforeDeserialization = async (t) =>
                (e.beforeDeserialization || ((e) => e))(t));
          }
          async persistCachedDatabaseAsync() {
            const e = [];
            if (!this.inMemoryOnly) {
              for (const t of this.db.getAllData())
                e.push(await this.afterSerialization(o.serialize(t)));
              for (const t of Object.keys(this.db.indexes))
                "_id" !== t &&
                  e.push(
                    await this.afterSerialization(
                      o.serialize({
                        $$indexCreated: {
                          fieldName: this.db.indexes[t].fieldName,
                          unique: this.db.indexes[t].unique,
                          sparse: this.db.indexes[t].sparse,
                        },
                      }),
                    ),
                  );
              await a.crashSafeWriteFileLinesAsync(
                this.filename,
                e,
                this.modes,
              ),
                this.db.emit("compaction.done");
            }
          }
          compactDatafile(e) {
            s(
              (e) => this.db.compactDatafile(e),
              "@seald-io/nedb: calling Datastore#persistence#compactDatafile is deprecated, please use Datastore#compactDatafile, it will be removed in the next major version.",
            )(e);
          }
          setAutocompactionInterval(e) {
            s(
              (e) => this.db.setAutocompactionInterval(e),
              "@seald-io/nedb: calling Datastore#persistence#setAutocompactionInterval is deprecated, please use Datastore#setAutocompactionInterval, it will be removed in the next major version.",
            )(e);
          }
          stopAutocompaction() {
            s(
              () => this.db.stopAutocompaction(),
              "@seald-io/nedb: calling Datastore#persistence#stopAutocompaction is deprecated, please use Datastore#stopAutocompaction, it will be removed in the next major version.",
            )();
          }
          async persistNewStateAsync(e) {
            let t = "";
            if (!this.inMemoryOnly) {
              for (const r of e)
                t += (await this.afterSerialization(o.serialize(r))) + "\n";
              0 !== t.length &&
                (await a.appendFileAsync(this.filename, t, {
                  encoding: "utf8",
                  mode: this.modes.fileMode,
                }));
            }
          }
          async treatRawData(e) {
            const t = e
                .split("\n")
                .filter((e) => "" !== e)
                .map(async (e) =>
                  o.deserialize(await this.beforeDeserialization(e)),
                ),
              r = {},
              s = {},
              i = t.length;
            let n = 0;
            for (const e of t)
              try {
                const t = await e;
                t._id
                  ? !0 === t.$$deleted
                    ? delete r[t._id]
                    : (r[t._id] = t)
                  : t.$$indexCreated && null != t.$$indexCreated.fieldName
                    ? (s[t.$$indexCreated.fieldName] = t.$$indexCreated)
                    : "string" == typeof t.$$indexRemoved &&
                      delete s[t.$$indexRemoved];
              } catch (e) {
                n += 1;
              }
            if (i > 0) {
              const e = n / i;
              if (e > this.corruptAlertThreshold) {
                const t = new Error(
                  `${Math.floor(100 * e)}% of the data file is corrupt, more than given corruptAlertThreshold (${Math.floor(100 * this.corruptAlertThreshold)}%). Cautiously refusing to start NeDB to prevent dataloss.`,
                );
                throw (
                  ((t.corruptionRate = e),
                  (t.corruptItems = n),
                  (t.dataLength = i),
                  t)
                );
              }
            }
            return { data: Object.values(r), indexes: s };
          }
          treatRawStreamAsync(e) {
            return new Promise((t, r) => {
              const s = {},
                n = {};
              let a = 0;
              const c = i(e);
              let l = 0;
              const d = new h();
              c.on("data", (e) => {
                const t = this.beforeDeserialization(e);
                return d.waterfall(async () => {
                  if ("" !== e) {
                    try {
                      const e = o.deserialize(await t);
                      e._id
                        ? !0 === e.$$deleted
                          ? delete s[e._id]
                          : (s[e._id] = e)
                        : e.$$indexCreated && null != e.$$indexCreated.fieldName
                          ? (n[e.$$indexCreated.fieldName] = e.$$indexCreated)
                          : "string" == typeof e.$$indexRemoved &&
                            delete n[e.$$indexRemoved];
                    } catch (e) {
                      a += 1;
                    }
                    l++;
                  }
                })();
              }),
                c.on("end", async () => {
                  if ((await d.guardian, l > 0)) {
                    const e = a / l;
                    if (e > this.corruptAlertThreshold) {
                      const t = new Error(
                        `${Math.floor(100 * e)}% of the data file is corrupt, more than given corruptAlertThreshold (${Math.floor(100 * this.corruptAlertThreshold)}%). Cautiously refusing to start NeDB to prevent dataloss.`,
                      );
                      return (
                        (t.corruptionRate = e),
                        (t.corruptItems = a),
                        (t.dataLength = l),
                        void r(t, null)
                      );
                    }
                  }
                  const e = Object.values(s);
                  t({ data: e, indexes: n });
                }),
                c.on("error", function (e) {
                  r(e, null);
                });
            });
          }
          async loadDatabaseAsync() {
            if ((this.db._resetIndexes(), this.inMemoryOnly)) return;
            let e;
            if (
              (await c.ensureParentDirectoryExistsAsync(
                this.filename,
                this.modes.dirMode,
              ),
              await a.ensureDatafileIntegrityAsync(
                this.filename,
                this.modes.fileMode,
              ),
              a.readFileStream)
            ) {
              const t = a.readFileStream(this.filename, {
                encoding: "utf8",
                mode: this.modes.fileMode,
              });
              e = await this.treatRawStreamAsync(t);
            } else {
              const t = await a.readFileAsync(this.filename, {
                encoding: "utf8",
                mode: this.modes.fileMode,
              });
              e = await this.treatRawData(t);
            }
            Object.keys(e.indexes).forEach((t) => {
              this.db.indexes[t] = new n(e.indexes[t]);
            });
            try {
              this.db._resetIndexes(e.data);
            } catch (e) {
              throw (this.db._resetIndexes(), e);
            }
            await this.db.persistence.persistCachedDatabaseAsync(),
              this.db.executor.processBuffer();
          }
          async dropDatabaseAsync() {
            this.db.stopAutocompaction(),
              (this.db.executor.ready = !1),
              this.db.executor.resetBuffer(),
              await this.db.executor.queue.guardian,
              (this.db.indexes = {}),
              (this.db.indexes._id = new n({ fieldName: "_id", unique: !0 })),
              (this.db.ttlIndexes = {}),
              this.db.inMemoryOnly ||
                (await this.db.executor.pushAsync(async () => {
                  (await a.existsAsync(this.filename)) &&
                    (await a.unlinkAsync(this.filename));
                }, !0));
          }
          static async ensureParentDirectoryExistsAsync(e, t = 493) {
            return a.ensureParentDirectoryExistsAsync(e, t);
          }
        }
        e.exports = c;
      },
      8611: (e) => {
        "use strict";
        e.exports = require("http");
      },
      8940: (e) => {
        var t = "Expected a function",
          r = /^\s+|\s+$/g,
          s = /^[-+]0x[0-9a-f]+$/i,
          i = /^0b[01]+$/i,
          n = /^0o[0-7]+$/i,
          o = parseInt,
          a =
            "object" == typeof global &&
            global &&
            global.Object === Object &&
            global,
          h = "object" == typeof self && self && self.Object === Object && self,
          c = a || h || Function("return this")(),
          l = Object.prototype.toString,
          d = Math.max,
          f = Math.min,
          u = function () {
            return c.Date.now();
          };
        function p(e) {
          var t = typeof e;
          return !!e && ("object" == t || "function" == t);
        }
        function y(e) {
          if ("number" == typeof e) return e;
          if (
            (function (e) {
              return (
                "symbol" == typeof e ||
                ((function (e) {
                  return !!e && "object" == typeof e;
                })(e) &&
                  "[object Symbol]" == l.call(e))
              );
            })(e)
          )
            return NaN;
          if (p(e)) {
            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
            e = p(t) ? t + "" : t;
          }
          if ("string" != typeof e) return 0 === e ? e : +e;
          e = e.replace(r, "");
          var a = i.test(e);
          return a || n.test(e)
            ? o(e.slice(2), a ? 2 : 8)
            : s.test(e)
              ? NaN
              : +e;
        }
        e.exports = function (e, r, s) {
          var i = !0,
            n = !0;
          if ("function" != typeof e) throw new TypeError(t);
          return (
            p(s) &&
              ((i = "leading" in s ? !!s.leading : i),
              (n = "trailing" in s ? !!s.trailing : n)),
            (function (e, r, s) {
              var i,
                n,
                o,
                a,
                h,
                c,
                l = 0,
                m = !1,
                _ = !1,
                g = !0;
              if ("function" != typeof e) throw new TypeError(t);
              function b(t) {
                var r = i,
                  s = n;
                return (i = n = void 0), (l = t), (a = e.apply(s, r));
              }
              function w(e) {
                var t = e - c;
                return void 0 === c || t >= r || t < 0 || (_ && e - l >= o);
              }
              function v() {
                var e = u();
                if (w(e)) return x(e);
                h = setTimeout(
                  v,
                  (function (e) {
                    var t = r - (e - c);
                    return _ ? f(t, o - (e - l)) : t;
                  })(e),
                );
              }
              function x(e) {
                return (h = void 0), g && i ? b(e) : ((i = n = void 0), a);
              }
              function k() {
                var e = u(),
                  t = w(e);
                if (((i = arguments), (n = this), (c = e), t)) {
                  if (void 0 === h)
                    return (function (e) {
                      return (l = e), (h = setTimeout(v, r)), m ? b(e) : a;
                    })(c);
                  if (_) return (h = setTimeout(v, r)), b(c);
                }
                return void 0 === h && (h = setTimeout(v, r)), a;
              }
              return (
                (r = y(r) || 0),
                p(s) &&
                  ((m = !!s.leading),
                  (o = (_ = "maxWait" in s) ? d(y(s.maxWait) || 0, r) : o),
                  (g = "trailing" in s ? !!s.trailing : g)),
                (k.cancel = function () {
                  void 0 !== h && clearTimeout(h),
                    (l = 0),
                    (i = c = n = h = void 0);
                }),
                (k.flush = function () {
                  return void 0 === h ? a : x(u());
                }),
                k
              );
            })(e, r, { leading: i, maxWait: r, trailing: n })
          );
        };
      },
      9023: (e) => {
        "use strict";
        e.exports = require("util");
      },
      9038: (e, t, r) => {
        "use strict";
        const s = r(4434),
          i = r(5692),
          n = r(8611),
          o = r(9278),
          a = r(4756),
          { randomBytes: h, createHash: c } = r(6982),
          { Duplex: l, Readable: d } = r(2203),
          { URL: f } = r(7016),
          u = r(4029),
          p = r(9092),
          y = r(6220),
          { isBlob: m } = r(9714),
          {
            BINARY_TYPES: _,
            EMPTY_BUFFER: g,
            GUID: b,
            kForOnEventAttribute: w,
            kListener: v,
            kStatusCode: x,
            kWebSocket: k,
            NOOP: S,
          } = r(6832),
          {
            EventTarget: { addEventListener: E, removeEventListener: O },
          } = r(5659),
          { format: A, parse: $ } = r(8168),
          { toBuffer: N } = r(1460),
          C = Symbol("kAborted"),
          T = [8, 13],
          D = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"],
          P = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;
        class I extends s {
          constructor(e, t, r) {
            super(),
              (this._binaryType = _[0]),
              (this._closeCode = 1006),
              (this._closeFrameReceived = !1),
              (this._closeFrameSent = !1),
              (this._closeMessage = g),
              (this._closeTimer = null),
              (this._errorEmitted = !1),
              (this._extensions = {}),
              (this._paused = !1),
              (this._protocol = ""),
              (this._readyState = I.CONNECTING),
              (this._receiver = null),
              (this._sender = null),
              (this._socket = null),
              null !== e
                ? ((this._bufferedAmount = 0),
                  (this._isServer = !1),
                  (this._redirects = 0),
                  void 0 === t
                    ? (t = [])
                    : Array.isArray(t) ||
                      ("object" == typeof t && null !== t
                        ? ((r = t), (t = []))
                        : (t = [t])),
                  j(this, e, t, r))
                : ((this._autoPong = r.autoPong), (this._isServer = !0));
          }
          get binaryType() {
            return this._binaryType;
          }
          set binaryType(e) {
            _.includes(e) &&
              ((this._binaryType = e),
              this._receiver && (this._receiver._binaryType = e));
          }
          get bufferedAmount() {
            return this._socket
              ? this._socket._writableState.length + this._sender._bufferedBytes
              : this._bufferedAmount;
          }
          get extensions() {
            return Object.keys(this._extensions).join();
          }
          get isPaused() {
            return this._paused;
          }
          get onclose() {
            return null;
          }
          get onerror() {
            return null;
          }
          get onopen() {
            return null;
          }
          get onmessage() {
            return null;
          }
          get protocol() {
            return this._protocol;
          }
          get readyState() {
            return this._readyState;
          }
          get url() {
            return this._url;
          }
          setSocket(e, t, r) {
            const s = new p({
                allowSynchronousEvents: r.allowSynchronousEvents,
                binaryType: this.binaryType,
                extensions: this._extensions,
                isServer: this._isServer,
                maxPayload: r.maxPayload,
                skipUTF8Validation: r.skipUTF8Validation,
              }),
              i = new y(e, this._extensions, r.generateMask);
            (this._receiver = s),
              (this._sender = i),
              (this._socket = e),
              (s[k] = this),
              (i[k] = this),
              (e[k] = this),
              s.on("conclude", U),
              s.on("drain", q),
              s.on("error", W),
              s.on("message", z),
              s.on("ping", K),
              s.on("pong", G),
              (i.onerror = Y),
              e.setTimeout && e.setTimeout(0),
              e.setNoDelay && e.setNoDelay(),
              t.length > 0 && e.unshift(t),
              e.on("close", X),
              e.on("data", Z),
              e.on("end", Q),
              e.on("error", ee),
              (this._readyState = I.OPEN),
              this.emit("open");
          }
          emitClose() {
            if (!this._socket)
              return (
                (this._readyState = I.CLOSED),
                void this.emit("close", this._closeCode, this._closeMessage)
              );
            this._extensions[u.extensionName] &&
              this._extensions[u.extensionName].cleanup(),
              this._receiver.removeAllListeners(),
              (this._readyState = I.CLOSED),
              this.emit("close", this._closeCode, this._closeMessage);
          }
          close(e, t) {
            if (this.readyState !== I.CLOSED) {
              if (this.readyState === I.CONNECTING) {
                const e =
                  "WebSocket was closed before the connection was established";
                return void R(this, this._req, e);
              }
              this.readyState !== I.CLOSING
                ? ((this._readyState = I.CLOSING),
                  this._sender.close(e, t, !this._isServer, (e) => {
                    e ||
                      ((this._closeFrameSent = !0),
                      (this._closeFrameReceived ||
                        this._receiver._writableState.errorEmitted) &&
                        this._socket.end());
                  }),
                  J(this))
                : this._closeFrameSent &&
                  (this._closeFrameReceived ||
                    this._receiver._writableState.errorEmitted) &&
                  this._socket.end();
            }
          }
          pause() {
            this.readyState !== I.CONNECTING &&
              this.readyState !== I.CLOSED &&
              ((this._paused = !0), this._socket.pause());
          }
          ping(e, t, r) {
            if (this.readyState === I.CONNECTING)
              throw new Error(
                "WebSocket is not open: readyState 0 (CONNECTING)",
              );
            "function" == typeof e
              ? ((r = e), (e = t = void 0))
              : "function" == typeof t && ((r = t), (t = void 0)),
              "number" == typeof e && (e = e.toString()),
              this.readyState === I.OPEN
                ? (void 0 === t && (t = !this._isServer),
                  this._sender.ping(e || g, t, r))
                : F(this, e, r);
          }
          pong(e, t, r) {
            if (this.readyState === I.CONNECTING)
              throw new Error(
                "WebSocket is not open: readyState 0 (CONNECTING)",
              );
            "function" == typeof e
              ? ((r = e), (e = t = void 0))
              : "function" == typeof t && ((r = t), (t = void 0)),
              "number" == typeof e && (e = e.toString()),
              this.readyState === I.OPEN
                ? (void 0 === t && (t = !this._isServer),
                  this._sender.pong(e || g, t, r))
                : F(this, e, r);
          }
          resume() {
            this.readyState !== I.CONNECTING &&
              this.readyState !== I.CLOSED &&
              ((this._paused = !1),
              this._receiver._writableState.needDrain || this._socket.resume());
          }
          send(e, t, r) {
            if (this.readyState === I.CONNECTING)
              throw new Error(
                "WebSocket is not open: readyState 0 (CONNECTING)",
              );
            if (
              ("function" == typeof t && ((r = t), (t = {})),
              "number" == typeof e && (e = e.toString()),
              this.readyState !== I.OPEN)
            )
              return void F(this, e, r);
            const s = {
              binary: "string" != typeof e,
              mask: !this._isServer,
              compress: !0,
              fin: !0,
              ...t,
            };
            this._extensions[u.extensionName] || (s.compress = !1),
              this._sender.send(e || g, s, r);
          }
          terminate() {
            if (this.readyState !== I.CLOSED) {
              if (this.readyState === I.CONNECTING) {
                const e =
                  "WebSocket was closed before the connection was established";
                return void R(this, this._req, e);
              }
              this._socket &&
                ((this._readyState = I.CLOSING), this._socket.destroy());
            }
          }
        }
        function j(e, t, r, s) {
          const o = {
            allowSynchronousEvents: !0,
            autoPong: !0,
            protocolVersion: T[1],
            maxPayload: 104857600,
            skipUTF8Validation: !1,
            perMessageDeflate: !0,
            followRedirects: !1,
            maxRedirects: 10,
            ...s,
            socketPath: void 0,
            hostname: void 0,
            protocol: void 0,
            timeout: void 0,
            method: "GET",
            host: void 0,
            path: void 0,
            port: void 0,
          };
          if (((e._autoPong = o.autoPong), !T.includes(o.protocolVersion)))
            throw new RangeError(
              `Unsupported protocol version: ${o.protocolVersion} (supported versions: ${T.join(", ")})`,
            );
          let a;
          if (t instanceof f) a = t;
          else
            try {
              a = new f(t);
            } catch (e) {
              throw new SyntaxError(`Invalid URL: ${t}`);
            }
          "http:" === a.protocol
            ? (a.protocol = "ws:")
            : "https:" === a.protocol && (a.protocol = "wss:"),
            (e._url = a.href);
          const l = "wss:" === a.protocol,
            d = "ws+unix:" === a.protocol;
          let p;
          if (
            ("ws:" === a.protocol || l || d
              ? d && !a.pathname
                ? (p = "The URL's pathname is empty")
                : a.hash && (p = "The URL contains a fragment identifier")
              : (p =
                  'The URL\'s protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"'),
            p)
          ) {
            const t = new SyntaxError(p);
            if (0 === e._redirects) throw t;
            return void M(e, t);
          }
          const y = l ? 443 : 80,
            m = h(16).toString("base64"),
            _ = l ? i.request : n.request,
            g = new Set();
          let w, v;
          if (
            ((o.createConnection = o.createConnection || (l ? L : B)),
            (o.defaultPort = o.defaultPort || y),
            (o.port = a.port || y),
            (o.host = a.hostname.startsWith("[")
              ? a.hostname.slice(1, -1)
              : a.hostname),
            (o.headers = {
              ...o.headers,
              "Sec-WebSocket-Version": o.protocolVersion,
              "Sec-WebSocket-Key": m,
              Connection: "Upgrade",
              Upgrade: "websocket",
            }),
            (o.path = a.pathname + a.search),
            (o.timeout = o.handshakeTimeout),
            o.perMessageDeflate &&
              ((w = new u(
                !0 !== o.perMessageDeflate ? o.perMessageDeflate : {},
                !1,
                o.maxPayload,
              )),
              (o.headers["Sec-WebSocket-Extensions"] = A({
                [u.extensionName]: w.offer(),
              }))),
            r.length)
          ) {
            for (const e of r) {
              if ("string" != typeof e || !P.test(e) || g.has(e))
                throw new SyntaxError(
                  "An invalid or duplicated subprotocol was specified",
                );
              g.add(e);
            }
            o.headers["Sec-WebSocket-Protocol"] = r.join(",");
          }
          if (
            (o.origin &&
              (o.protocolVersion < 13
                ? (o.headers["Sec-WebSocket-Origin"] = o.origin)
                : (o.headers.Origin = o.origin)),
            (a.username || a.password) &&
              (o.auth = `${a.username}:${a.password}`),
            d)
          ) {
            const e = o.path.split(":");
            (o.socketPath = e[0]), (o.path = e[1]);
          }
          if (o.followRedirects) {
            if (0 === e._redirects) {
              (e._originalIpc = d),
                (e._originalSecure = l),
                (e._originalHostOrSocketPath = d ? o.socketPath : a.host);
              const t = s && s.headers;
              if (((s = { ...s, headers: {} }), t))
                for (const [e, r] of Object.entries(t))
                  s.headers[e.toLowerCase()] = r;
            } else if (0 === e.listenerCount("redirect")) {
              const t = d
                ? !!e._originalIpc &&
                  o.socketPath === e._originalHostOrSocketPath
                : !e._originalIpc && a.host === e._originalHostOrSocketPath;
              (!t || (e._originalSecure && !l)) &&
                (delete o.headers.authorization,
                delete o.headers.cookie,
                t || delete o.headers.host,
                (o.auth = void 0));
            }
            o.auth &&
              !s.headers.authorization &&
              (s.headers.authorization =
                "Basic " + Buffer.from(o.auth).toString("base64")),
              (v = e._req = _(o)),
              e._redirects && e.emit("redirect", e.url, v);
          } else v = e._req = _(o);
          o.timeout &&
            v.on("timeout", () => {
              R(e, v, "Opening handshake has timed out");
            }),
            v.on("error", (t) => {
              null === v || v[C] || ((v = e._req = null), M(e, t));
            }),
            v.on("response", (i) => {
              const n = i.headers.location,
                a = i.statusCode;
              if (n && o.followRedirects && a >= 300 && a < 400) {
                if (++e._redirects > o.maxRedirects)
                  return void R(e, v, "Maximum redirects exceeded");
                let i;
                v.abort();
                try {
                  i = new f(n, t);
                } catch (t) {
                  const r = new SyntaxError(`Invalid URL: ${n}`);
                  return void M(e, r);
                }
                j(e, i, r, s);
              } else
                e.emit("unexpected-response", v, i) ||
                  R(e, v, `Unexpected server response: ${i.statusCode}`);
            }),
            v.on("upgrade", (t, r, s) => {
              if ((e.emit("upgrade", t), e.readyState !== I.CONNECTING)) return;
              v = e._req = null;
              const i = t.headers.upgrade;
              if (void 0 === i || "websocket" !== i.toLowerCase())
                return void R(e, r, "Invalid Upgrade header");
              const n = c("sha1")
                .update(m + b)
                .digest("base64");
              if (t.headers["sec-websocket-accept"] !== n)
                return void R(e, r, "Invalid Sec-WebSocket-Accept header");
              const a = t.headers["sec-websocket-protocol"];
              let h;
              if (
                (void 0 !== a
                  ? g.size
                    ? g.has(a) || (h = "Server sent an invalid subprotocol")
                    : (h = "Server sent a subprotocol but none was requested")
                  : g.size && (h = "Server sent no subprotocol"),
                h)
              )
                return void R(e, r, h);
              a && (e._protocol = a);
              const l = t.headers["sec-websocket-extensions"];
              if (void 0 !== l) {
                if (!w)
                  return void R(
                    e,
                    r,
                    "Server sent a Sec-WebSocket-Extensions header but no extension was requested",
                  );
                let t;
                try {
                  t = $(l);
                } catch (t) {
                  return void R(
                    e,
                    r,
                    "Invalid Sec-WebSocket-Extensions header",
                  );
                }
                const s = Object.keys(t);
                if (1 !== s.length || s[0] !== u.extensionName)
                  return void R(
                    e,
                    r,
                    "Server indicated an extension that was not requested",
                  );
                try {
                  w.accept(t[u.extensionName]);
                } catch (t) {
                  return void R(
                    e,
                    r,
                    "Invalid Sec-WebSocket-Extensions header",
                  );
                }
                e._extensions[u.extensionName] = w;
              }
              e.setSocket(r, s, {
                allowSynchronousEvents: o.allowSynchronousEvents,
                generateMask: o.generateMask,
                maxPayload: o.maxPayload,
                skipUTF8Validation: o.skipUTF8Validation,
              });
            }),
            o.finishRequest ? o.finishRequest(v, e) : v.end();
        }
        function M(e, t) {
          (e._readyState = I.CLOSING),
            (e._errorEmitted = !0),
            e.emit("error", t),
            e.emitClose();
        }
        function B(e) {
          return (e.path = e.socketPath), o.connect(e);
        }
        function L(e) {
          return (
            (e.path = void 0),
            e.servername ||
              "" === e.servername ||
              (e.servername = o.isIP(e.host) ? "" : e.host),
            a.connect(e)
          );
        }
        function R(e, t, r) {
          e._readyState = I.CLOSING;
          const s = new Error(r);
          Error.captureStackTrace(s, R),
            t.setHeader
              ? ((t[C] = !0),
                t.abort(),
                t.socket && !t.socket.destroyed && t.socket.destroy(),
                process.nextTick(M, e, s))
              : (t.destroy(s),
                t.once("error", e.emit.bind(e, "error")),
                t.once("close", e.emitClose.bind(e)));
        }
        function F(e, t, r) {
          if (t) {
            const r = m(t) ? t.size : N(t).length;
            e._socket
              ? (e._sender._bufferedBytes += r)
              : (e._bufferedAmount += r);
          }
          if (r) {
            const t = new Error(
              `WebSocket is not open: readyState ${e.readyState} (${D[e.readyState]})`,
            );
            process.nextTick(r, t);
          }
        }
        function U(e, t) {
          const r = this[k];
          (r._closeFrameReceived = !0),
            (r._closeMessage = t),
            (r._closeCode = e),
            void 0 !== r._socket[k] &&
              (r._socket.removeListener("data", Z),
              process.nextTick(H, r._socket),
              1005 === e ? r.close() : r.close(e, t));
        }
        function q() {
          const e = this[k];
          e.isPaused || e._socket.resume();
        }
        function W(e) {
          const t = this[k];
          void 0 !== t._socket[k] &&
            (t._socket.removeListener("data", Z),
            process.nextTick(H, t._socket),
            t.close(e[x])),
            t._errorEmitted || ((t._errorEmitted = !0), t.emit("error", e));
        }
        function V() {
          this[k].emitClose();
        }
        function z(e, t) {
          this[k].emit("message", e, t);
        }
        function K(e) {
          const t = this[k];
          t._autoPong && t.pong(e, !this._isServer, S), t.emit("ping", e);
        }
        function G(e) {
          this[k].emit("pong", e);
        }
        function H(e) {
          e.resume();
        }
        function Y(e) {
          const t = this[k];
          t.readyState !== I.CLOSED &&
            (t.readyState === I.OPEN && ((t._readyState = I.CLOSING), J(t)),
            this._socket.end(),
            t._errorEmitted || ((t._errorEmitted = !0), t.emit("error", e)));
        }
        function J(e) {
          e._closeTimer = setTimeout(e._socket.destroy.bind(e._socket), 3e4);
        }
        function X() {
          const e = this[k];
          let t;
          this.removeListener("close", X),
            this.removeListener("data", Z),
            this.removeListener("end", Q),
            (e._readyState = I.CLOSING),
            this._readableState.endEmitted ||
              e._closeFrameReceived ||
              e._receiver._writableState.errorEmitted ||
              null === (t = e._socket.read()) ||
              e._receiver.write(t),
            e._receiver.end(),
            (this[k] = void 0),
            clearTimeout(e._closeTimer),
            e._receiver._writableState.finished ||
            e._receiver._writableState.errorEmitted
              ? e.emitClose()
              : (e._receiver.on("error", V), e._receiver.on("finish", V));
        }
        function Z(e) {
          this[k]._receiver.write(e) || this.pause();
        }
        function Q() {
          const e = this[k];
          (e._readyState = I.CLOSING), e._receiver.end(), this.end();
        }
        function ee() {
          const e = this[k];
          this.removeListener("error", ee),
            this.on("error", S),
            e && ((e._readyState = I.CLOSING), this.destroy());
        }
        Object.defineProperty(I, "CONNECTING", {
          enumerable: !0,
          value: D.indexOf("CONNECTING"),
        }),
          Object.defineProperty(I.prototype, "CONNECTING", {
            enumerable: !0,
            value: D.indexOf("CONNECTING"),
          }),
          Object.defineProperty(I, "OPEN", {
            enumerable: !0,
            value: D.indexOf("OPEN"),
          }),
          Object.defineProperty(I.prototype, "OPEN", {
            enumerable: !0,
            value: D.indexOf("OPEN"),
          }),
          Object.defineProperty(I, "CLOSING", {
            enumerable: !0,
            value: D.indexOf("CLOSING"),
          }),
          Object.defineProperty(I.prototype, "CLOSING", {
            enumerable: !0,
            value: D.indexOf("CLOSING"),
          }),
          Object.defineProperty(I, "CLOSED", {
            enumerable: !0,
            value: D.indexOf("CLOSED"),
          }),
          Object.defineProperty(I.prototype, "CLOSED", {
            enumerable: !0,
            value: D.indexOf("CLOSED"),
          }),
          [
            "binaryType",
            "bufferedAmount",
            "extensions",
            "isPaused",
            "protocol",
            "readyState",
            "url",
          ].forEach((e) => {
            Object.defineProperty(I.prototype, e, { enumerable: !0 });
          }),
          ["open", "error", "close", "message"].forEach((e) => {
            Object.defineProperty(I.prototype, `on${e}`, {
              enumerable: !0,
              get() {
                for (const t of this.listeners(e)) if (t[w]) return t[v];
                return null;
              },
              set(t) {
                for (const t of this.listeners(e))
                  if (t[w]) {
                    this.removeListener(e, t);
                    break;
                  }
                "function" == typeof t &&
                  this.addEventListener(e, t, { [w]: !0 });
              },
            });
          }),
          (I.prototype.addEventListener = E),
          (I.prototype.removeEventListener = O),
          (e.exports = I);
      },
      9092: (e, t, r) => {
        "use strict";
        const { Writable: s } = r(2203),
          i = r(4029),
          {
            BINARY_TYPES: n,
            EMPTY_BUFFER: o,
            kStatusCode: a,
            kWebSocket: h,
          } = r(6832),
          { concat: c, toArrayBuffer: l, unmask: d } = r(1460),
          { isValidStatusCode: f, isValidUTF8: u } = r(9714),
          p = Buffer[Symbol.species];
        e.exports = class extends s {
          constructor(e = {}) {
            super(),
              (this._allowSynchronousEvents =
                void 0 === e.allowSynchronousEvents ||
                e.allowSynchronousEvents),
              (this._binaryType = e.binaryType || n[0]),
              (this._extensions = e.extensions || {}),
              (this._isServer = !!e.isServer),
              (this._maxPayload = 0 | e.maxPayload),
              (this._skipUTF8Validation = !!e.skipUTF8Validation),
              (this[h] = void 0),
              (this._bufferedBytes = 0),
              (this._buffers = []),
              (this._compressed = !1),
              (this._payloadLength = 0),
              (this._mask = void 0),
              (this._fragmented = 0),
              (this._masked = !1),
              (this._fin = !1),
              (this._opcode = 0),
              (this._totalPayloadLength = 0),
              (this._messageLength = 0),
              (this._fragments = []),
              (this._errored = !1),
              (this._loop = !1),
              (this._state = 0);
          }
          _write(e, t, r) {
            if (8 === this._opcode && 0 == this._state) return r();
            (this._bufferedBytes += e.length),
              this._buffers.push(e),
              this.startLoop(r);
          }
          consume(e) {
            if (((this._bufferedBytes -= e), e === this._buffers[0].length))
              return this._buffers.shift();
            if (e < this._buffers[0].length) {
              const t = this._buffers[0];
              return (
                (this._buffers[0] = new p(
                  t.buffer,
                  t.byteOffset + e,
                  t.length - e,
                )),
                new p(t.buffer, t.byteOffset, e)
              );
            }
            const t = Buffer.allocUnsafe(e);
            do {
              const r = this._buffers[0],
                s = t.length - e;
              e >= r.length
                ? t.set(this._buffers.shift(), s)
                : (t.set(new Uint8Array(r.buffer, r.byteOffset, e), s),
                  (this._buffers[0] = new p(
                    r.buffer,
                    r.byteOffset + e,
                    r.length - e,
                  ))),
                (e -= r.length);
            } while (e > 0);
            return t;
          }
          startLoop(e) {
            this._loop = !0;
            do {
              switch (this._state) {
                case 0:
                  this.getInfo(e);
                  break;
                case 1:
                  this.getPayloadLength16(e);
                  break;
                case 2:
                  this.getPayloadLength64(e);
                  break;
                case 3:
                  this.getMask();
                  break;
                case 4:
                  this.getData(e);
                  break;
                case 5:
                case 6:
                  return void (this._loop = !1);
              }
            } while (this._loop);
            this._errored || e();
          }
          getInfo(e) {
            if (this._bufferedBytes < 2) return void (this._loop = !1);
            const t = this.consume(2);
            if (48 & t[0])
              return void e(
                this.createError(
                  RangeError,
                  "RSV2 and RSV3 must be clear",
                  !0,
                  1002,
                  "WS_ERR_UNEXPECTED_RSV_2_3",
                ),
              );
            const r = !(64 & ~t[0]);
            if (!r || this._extensions[i.extensionName]) {
              if (
                ((this._fin = !(128 & ~t[0])),
                (this._opcode = 15 & t[0]),
                (this._payloadLength = 127 & t[1]),
                0 === this._opcode)
              ) {
                if (r)
                  return void e(
                    this.createError(
                      RangeError,
                      "RSV1 must be clear",
                      !0,
                      1002,
                      "WS_ERR_UNEXPECTED_RSV_1",
                    ),
                  );
                if (!this._fragmented)
                  return void e(
                    this.createError(
                      RangeError,
                      "invalid opcode 0",
                      !0,
                      1002,
                      "WS_ERR_INVALID_OPCODE",
                    ),
                  );
                this._opcode = this._fragmented;
              } else if (1 === this._opcode || 2 === this._opcode) {
                if (this._fragmented)
                  return void e(
                    this.createError(
                      RangeError,
                      `invalid opcode ${this._opcode}`,
                      !0,
                      1002,
                      "WS_ERR_INVALID_OPCODE",
                    ),
                  );
                this._compressed = r;
              } else {
                if (!(this._opcode > 7 && this._opcode < 11))
                  return void e(
                    this.createError(
                      RangeError,
                      `invalid opcode ${this._opcode}`,
                      !0,
                      1002,
                      "WS_ERR_INVALID_OPCODE",
                    ),
                  );
                if (!this._fin)
                  return void e(
                    this.createError(
                      RangeError,
                      "FIN must be set",
                      !0,
                      1002,
                      "WS_ERR_EXPECTED_FIN",
                    ),
                  );
                if (r)
                  return void e(
                    this.createError(
                      RangeError,
                      "RSV1 must be clear",
                      !0,
                      1002,
                      "WS_ERR_UNEXPECTED_RSV_1",
                    ),
                  );
                if (
                  this._payloadLength > 125 ||
                  (8 === this._opcode && 1 === this._payloadLength)
                )
                  return void e(
                    this.createError(
                      RangeError,
                      `invalid payload length ${this._payloadLength}`,
                      !0,
                      1002,
                      "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH",
                    ),
                  );
              }
              if (
                (this._fin ||
                  this._fragmented ||
                  (this._fragmented = this._opcode),
                (this._masked = !(128 & ~t[1])),
                this._isServer)
              ) {
                if (!this._masked)
                  return void e(
                    this.createError(
                      RangeError,
                      "MASK must be set",
                      !0,
                      1002,
                      "WS_ERR_EXPECTED_MASK",
                    ),
                  );
              } else if (this._masked)
                return void e(
                  this.createError(
                    RangeError,
                    "MASK must be clear",
                    !0,
                    1002,
                    "WS_ERR_UNEXPECTED_MASK",
                  ),
                );
              126 === this._payloadLength
                ? (this._state = 1)
                : 127 === this._payloadLength
                  ? (this._state = 2)
                  : this.haveLength(e);
            } else
              e(
                this.createError(
                  RangeError,
                  "RSV1 must be clear",
                  !0,
                  1002,
                  "WS_ERR_UNEXPECTED_RSV_1",
                ),
              );
          }
          getPayloadLength16(e) {
            this._bufferedBytes < 2
              ? (this._loop = !1)
              : ((this._payloadLength = this.consume(2).readUInt16BE(0)),
                this.haveLength(e));
          }
          getPayloadLength64(e) {
            if (this._bufferedBytes < 8) return void (this._loop = !1);
            const t = this.consume(8),
              r = t.readUInt32BE(0);
            r > Math.pow(2, 21) - 1
              ? e(
                  this.createError(
                    RangeError,
                    "Unsupported WebSocket frame: payload length > 2^53 - 1",
                    !1,
                    1009,
                    "WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH",
                  ),
                )
              : ((this._payloadLength =
                  r * Math.pow(2, 32) + t.readUInt32BE(4)),
                this.haveLength(e));
          }
          haveLength(e) {
            this._payloadLength &&
            this._opcode < 8 &&
            ((this._totalPayloadLength += this._payloadLength),
            this._totalPayloadLength > this._maxPayload && this._maxPayload > 0)
              ? e(
                  this.createError(
                    RangeError,
                    "Max payload size exceeded",
                    !1,
                    1009,
                    "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",
                  ),
                )
              : this._masked
                ? (this._state = 3)
                : (this._state = 4);
          }
          getMask() {
            this._bufferedBytes < 4
              ? (this._loop = !1)
              : ((this._mask = this.consume(4)), (this._state = 4));
          }
          getData(e) {
            let t = o;
            if (this._payloadLength) {
              if (this._bufferedBytes < this._payloadLength)
                return void (this._loop = !1);
              (t = this.consume(this._payloadLength)),
                this._masked &&
                  0 !==
                    (this._mask[0] |
                      this._mask[1] |
                      this._mask[2] |
                      this._mask[3]) &&
                  d(t, this._mask);
            }
            if (this._opcode > 7) this.controlMessage(t, e);
            else {
              if (this._compressed)
                return (this._state = 5), void this.decompress(t, e);
              t.length &&
                ((this._messageLength = this._totalPayloadLength),
                this._fragments.push(t)),
                this.dataMessage(e);
            }
          }
          decompress(e, t) {
            this._extensions[i.extensionName].decompress(
              e,
              this._fin,
              (e, r) => {
                if (e) return t(e);
                if (r.length) {
                  if (
                    ((this._messageLength += r.length),
                    this._messageLength > this._maxPayload &&
                      this._maxPayload > 0)
                  ) {
                    const e = this.createError(
                      RangeError,
                      "Max payload size exceeded",
                      !1,
                      1009,
                      "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",
                    );
                    return void t(e);
                  }
                  this._fragments.push(r);
                }
                this.dataMessage(t), 0 === this._state && this.startLoop(t);
              },
            );
          }
          dataMessage(e) {
            if (!this._fin) return void (this._state = 0);
            const t = this._messageLength,
              r = this._fragments;
            if (
              ((this._totalPayloadLength = 0),
              (this._messageLength = 0),
              (this._fragmented = 0),
              (this._fragments = []),
              2 === this._opcode)
            ) {
              let s;
              (s =
                "nodebuffer" === this._binaryType
                  ? c(r, t)
                  : "arraybuffer" === this._binaryType
                    ? l(c(r, t))
                    : "blob" === this._binaryType
                      ? new Blob(r)
                      : r),
                this._allowSynchronousEvents
                  ? (this.emit("message", s, !0), (this._state = 0))
                  : ((this._state = 6),
                    setImmediate(() => {
                      this.emit("message", s, !0),
                        (this._state = 0),
                        this.startLoop(e);
                    }));
            } else {
              const s = c(r, t);
              if (!this._skipUTF8Validation && !u(s)) {
                const t = this.createError(
                  Error,
                  "invalid UTF-8 sequence",
                  !0,
                  1007,
                  "WS_ERR_INVALID_UTF8",
                );
                return void e(t);
              }
              5 === this._state || this._allowSynchronousEvents
                ? (this.emit("message", s, !1), (this._state = 0))
                : ((this._state = 6),
                  setImmediate(() => {
                    this.emit("message", s, !1),
                      (this._state = 0),
                      this.startLoop(e);
                  }));
            }
          }
          controlMessage(e, t) {
            if (8 !== this._opcode)
              this._allowSynchronousEvents
                ? (this.emit(9 === this._opcode ? "ping" : "pong", e),
                  (this._state = 0))
                : ((this._state = 6),
                  setImmediate(() => {
                    this.emit(9 === this._opcode ? "ping" : "pong", e),
                      (this._state = 0),
                      this.startLoop(t);
                  }));
            else {
              if (0 === e.length)
                (this._loop = !1), this.emit("conclude", 1005, o), this.end();
              else {
                const r = e.readUInt16BE(0);
                if (!f(r)) {
                  const e = this.createError(
                    RangeError,
                    `invalid status code ${r}`,
                    !0,
                    1002,
                    "WS_ERR_INVALID_CLOSE_CODE",
                  );
                  return void t(e);
                }
                const s = new p(e.buffer, e.byteOffset + 2, e.length - 2);
                if (!this._skipUTF8Validation && !u(s)) {
                  const e = this.createError(
                    Error,
                    "invalid UTF-8 sequence",
                    !0,
                    1007,
                    "WS_ERR_INVALID_UTF8",
                  );
                  return void t(e);
                }
                (this._loop = !1), this.emit("conclude", r, s), this.end();
              }
              this._state = 0;
            }
          }
          createError(e, t, r, s, i) {
            (this._loop = !1), (this._errored = !0);
            const n = new e(r ? `Invalid WebSocket frame: ${t}` : t);
            return (
              Error.captureStackTrace(n, this.createError),
              (n.code = i),
              (n[a] = s),
              n
            );
          }
        };
      },
      9278: (e) => {
        "use strict";
        e.exports = require("net");
      },
      9686: (e, t, r) => {
        const s = r(5387),
          { callbackify: i } = r(9023);
        e.exports = class {
          constructor(e, t, r) {
            (this.db = e),
              (this.query = t || {}),
              r && (this.mapFn = r),
              (this._limit = void 0),
              (this._skip = void 0),
              (this._sort = void 0),
              (this._projection = void 0);
          }
          limit(e) {
            return (this._limit = e), this;
          }
          skip(e) {
            return (this._skip = e), this;
          }
          sort(e) {
            return (this._sort = e), this;
          }
          projection(e) {
            return (this._projection = e), this;
          }
          _project(e) {
            const t = [];
            let r;
            if (
              void 0 === this._projection ||
              0 === Object.keys(this._projection).length
            )
              return e;
            const i = 0 !== this._projection._id,
              { _id: n, ...o } = this._projection;
            this._projection = o;
            const a = Object.keys(this._projection);
            return (
              a.forEach((e) => {
                if (void 0 !== r && this._projection[e] !== r)
                  throw new Error(
                    "Can't both keep and omit fields except for _id",
                  );
                r = this._projection[e];
              }),
              e.forEach((e) => {
                let n;
                1 === r
                  ? ((n = { $set: {} }),
                    a.forEach((t) => {
                      (n.$set[t] = s.getDotValue(e, t)),
                        void 0 === n.$set[t] && delete n.$set[t];
                    }),
                    (n = s.modify({}, n)))
                  : ((n = { $unset: {} }),
                    a.forEach((e) => {
                      n.$unset[e] = !0;
                    }),
                    (n = s.modify(e, n))),
                  i ? (n._id = e._id) : delete n._id,
                  t.push(n);
              }),
              t
            );
          }
          async _execAsync() {
            let e = [],
              t = 0,
              r = 0;
            const i = await this.db._getCandidatesAsync(this.query);
            for (const n of i)
              if (s.match(n, this.query))
                if (this._sort) e.push(n);
                else if (this._skip && this._skip > r) r += 1;
                else if ((e.push(n), (t += 1), this._limit && this._limit <= t))
                  break;
            if (this._sort) {
              const t = Object.entries(this._sort).map(([e, t]) => ({
                key: e,
                direction: t,
              }));
              e.sort((e, r) => {
                for (const i of t) {
                  const t =
                    i.direction *
                    s.compareThings(
                      s.getDotValue(e, i.key),
                      s.getDotValue(r, i.key),
                      this.db.compareStrings,
                    );
                  if (0 !== t) return t;
                }
                return 0;
              });
              const r = this._limit || e.length,
                i = this._skip || 0;
              e = e.slice(i, i + r);
            }
            return (e = this._project(e)), this.mapFn ? this.mapFn(e) : e;
          }
          exec(e) {
            i(() => this.execAsync())(e);
          }
          execAsync() {
            return this.db.executor.pushAsync(() => this._execAsync());
          }
          then(e, t) {
            return this.execAsync().then(e, t);
          }
          catch(e) {
            return this.execAsync().catch(e);
          }
          finally(e) {
            return this.execAsync().finally(e);
          }
        };
      },
      9693: (e) => {
        "use strict";
        const t = Symbol("kDone"),
          r = Symbol("kRun");
        e.exports = class {
          constructor(e) {
            (this[t] = () => {
              this.pending--, this[r]();
            }),
              (this.concurrency = e || 1 / 0),
              (this.jobs = []),
              (this.pending = 0);
          }
          add(e) {
            this.jobs.push(e), this[r]();
          }
          [r]() {
            if (this.pending !== this.concurrency && this.jobs.length) {
              const e = this.jobs.shift();
              this.pending++, e(this[t]);
            }
          }
        };
      },
      9714: (e, t, r) => {
        "use strict";
        const { isUtf8: s } = r(181),
          { hasBlob: i } = r(6832);
        function n(e) {
          const t = e.length;
          let r = 0;
          for (; r < t; )
            if (128 & e[r])
              if (192 == (224 & e[r])) {
                if (
                  r + 1 === t ||
                  128 != (192 & e[r + 1]) ||
                  192 == (254 & e[r])
                )
                  return !1;
                r += 2;
              } else if (224 == (240 & e[r])) {
                if (
                  r + 2 >= t ||
                  128 != (192 & e[r + 1]) ||
                  128 != (192 & e[r + 2]) ||
                  (224 === e[r] && 128 == (224 & e[r + 1])) ||
                  (237 === e[r] && 160 == (224 & e[r + 1]))
                )
                  return !1;
                r += 3;
              } else {
                if (240 != (248 & e[r])) return !1;
                if (
                  r + 3 >= t ||
                  128 != (192 & e[r + 1]) ||
                  128 != (192 & e[r + 2]) ||
                  128 != (192 & e[r + 3]) ||
                  (240 === e[r] && 128 == (240 & e[r + 1])) ||
                  (244 === e[r] && e[r + 1] > 143) ||
                  e[r] > 244
                )
                  return !1;
                r += 4;
              }
            else r++;
          return !0;
        }
        if (
          ((e.exports = {
            isBlob: function (e) {
              return (
                i &&
                "object" == typeof e &&
                "function" == typeof e.arrayBuffer &&
                "string" == typeof e.type &&
                "function" == typeof e.stream &&
                ("Blob" === e[Symbol.toStringTag] ||
                  "File" === e[Symbol.toStringTag])
              );
            },
            isValidStatusCode: function (e) {
              return (
                (e >= 1e3 &&
                  e <= 1014 &&
                  1004 !== e &&
                  1005 !== e &&
                  1006 !== e) ||
                (e >= 3e3 && e <= 4999)
              );
            },
            isValidUTF8: n,
            tokenChars: [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1,
              0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
              1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
              1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
              1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0,
            ],
          }),
          s)
        )
          e.exports.isValidUTF8 = function (e) {
            return e.length < 24 ? n(e) : s(e);
          };
        else if (!process.env.WS_NO_UTF_8_VALIDATE)
          try {
            const t = r(
              Object(
                (function () {
                  var e = new Error("Cannot find module 'utf-8-validate'");
                  throw ((e.code = "MODULE_NOT_FOUND"), e);
                })(),
              ),
            );
            e.exports.isValidUTF8 = function (e) {
              return e.length < 32 ? n(e) : t(e);
            };
          } catch (e) {}
      },
      9896: (e) => {
        "use strict";
        e.exports = require("fs");
      },
    },
    t = {},
    r = (function r(s) {
      var i = t[s];
      if (void 0 !== i) return i.exports;
      var n = (t[s] = { exports: {} });
      return e[s](n, n.exports, r), n.exports;
    })(5237),
    s = exports;
  for (var i in r) s[i] = r[i];
  r.__esModule && Object.defineProperty(s, "__esModule", { value: !0 });
})();
