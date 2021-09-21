// Java.perform(function () {
//   const UnityPlayerE1 = Java.use("com.unity3d.player.UnityPlayer$e$1");
//   const Vibrator = Java.use("android.os.Vibrator");
//   const UnityPlayer = Java.use("com.unity3d.player.UnityPlayer");

//   function awaitForCondition(callback) {
//     var i = setInterval(function () {
//       var addr = Module.findBaseAddress("libil2cpp.so");
//       console.log("Address found:", addr);

//       if (addr) {
//         clearInterval(i);
//         callback(+addr);
//       }
//     }, 0);
//   }

//   var il2cpp = null;

//   awaitForCondition(function (base) {
//     il2cpp = ptr(base);

//     Interceptor.attach(il2cpp.add("0x2B3FE0C"), {
//       onEnter: function (args) {
//         console.log("InitilaizeFish Entered!", args);
//       },
//     });

//     Interceptor.attach(il2cpp.add("0xC35A58"), {
//       onEnter: function (args) {
//         console.log("SendToSyncPlayerJump", args[0].readFloat());
//       },
//     });
//   });

//   function debug() {
//     console.log(JSON.stringify(arguments));
//   }

//   // debug(UnityPlayer.RUN_STATE_CHANGED_MSG_CODE.value);

//   Vibrator.vibrate.overload(
//     "[J",
//     "int",
//     "android.media.AudioAttributes"
//   ).implementation = function () {
//     // Java.perform(function () {
//     //   console.log(
//     //     Java.use("android.util.Log").getStackTraceString(
//     //       Java.use("java.lang.Exception").$new()
//     //     )
//     //   );
//     // });

//     // debug(arguments[0]);

//     let value = arguments[0][1];

//     send({ type: "vibrate", value });
//   };

//   // UnityPlayerE1.handleMessage.implementation = function(message) {
//   //   debug('message.obj', message.obj.value.toString());

//   //   return this.handleMessage(message);
//   // }
// });

const fishes = [
  "Crayfish",
  "Rosy Bitterling",
  "Pale Bleak",
  "Sweetfish",
  "Slender Shinner",
  "Softshell Turtle",
  "Bluegill",
  "Cherry Salmon",
  "Carp",
  "Bass",
  "Catfish",
  "Footballfish",
  "Cutlassfish",
  "Squid",
  "Mackerel",
  "Shark",
  "Spearfish",
  "Rockfish",
  "Flatfish",
  "Ocean Sunfish",
  "Scorpionfish",
  "Seahorse",
  "Starfish",
  "Butterflyfish",
  "Filefish",
  "Red Seabream",
  "Octopus",
  "Tiger Puffer",
  "Dolphin",
  "Red Stingray",
  "Rainbow Trout",
  "Atlantic Salmon",
  "Yellowtail",
  "Ricefish",
  "Cuttlefish",
  "Tuna",
  "Sea Eel",
  "Parrotfish",
  "Goliath Tigerfish",
  "Piranha",
  "Giant Manta Ray",
  "Dumbo Octopus",
  "Inia",
  "Striped Beakfish",
  "Killer Whale",
  "Crocodile",
  "Hammerhead Shark",
  "Blue Tang",
  "Stripey",
  "Giant Snakehead",
  "Sperm Whale",
  "Blue Whale",
  "Clown Fish",
  "Lake Skygazer",
  "Peppermint Angelfish",
  "Sawshark",
  "Horsehead Tilefish",
  "Arowana",
  "French Angelfish",
  "Misgurnus",
  "Garibaldi",
  "Queen Angelfish",
  "Eel",
  "Golden Mandarin Fish",
  "Anglerfish",
  "King Crab",
  "Flower Horn",
  "Yellow Grouper",
  "Axolotl",
  "Golden Shiner",
  "Finless Porpoise",
  "Alligator Gar",
  "Goonch Catfish",
  "Sea Turtle",
  "Blobfish",
  "Nautilidae",
  "Northern Snakehead",
  "Pirarucu",
  "Atlantic Cod",
  "Clarion Angelfish",
];

function awaitForCondition(callback) {
  var i = setInterval(function () {
    var addr = Module.findBaseAddress("libil2cpp.so");
    // console.log("Address found:", addr);

    if (addr) {
      clearInterval(i);
      callback(+addr);
    }
  }, 0);
}

var il2cpp = null;

function getCoors(vector3Instance) {
  return {
    x: vector3Instance.add("0x8").readDouble(),
    y: vector3Instance.add("0x10").readDouble(),
    z: vector3Instance.add("0x18").readDouble()
  }
}

awaitForCondition(function (base) {
  il2cpp = ptr(base);

  let fish = null;
  // let shadowMap = {};
  // let isMyActor = new NativeFunction(il2cpp.add("0xC32804"), 'bool', ['pointer']);
  // let setInvisible = new NativeFunction(il2cpp.add("0xC33B50"), "void", [
  //   "pointer",
  //   "bool",
  // ]);
  // let getSuid = new NativeFunction(il2cpp.add("0xC327E4"), 'long', [
  //   'pointer'
  // ]);
  // let sendToSyncPlayerWarp = new NativeFunction(
  //   il2cpp.add("0xC35E78"), "void", ["pointer", "pointer", "float"]
  // );
  // let warpToSpawn = new NativeFunction(il2cpp.add("0xA91298"), "void", ["pointer"]);
  // let onClickLift = new NativeFunction(il2cpp.add("0xC4E914"), "void", [
  //   "pointer",
  //   "long"
  // ]);
  // let Vector3Init = new NativeFunction(il2cpp.add("0x8D2CA4"), "pointer", ["double", "double", "double"]);

  // let vectorSet = new Set();

  // Interceptor.attach(il2cpp.add("0x8D2CA4"), {
  //   // onEnter: function (args) {
  //   //   console.log("Vector3Init", args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
  //   //   console.log(JSON.stringify(this.context));
  //   // },
  //   onLeave: function (retval) {
  //     vectorSet.add(retval.toString());
  //     // console.log(retval.readByteArray(100));
  //     // console.log(JSON.stringify(getCoors(retval)));
  //   }
  // });

  // let testVector3 = Vector3Init(0, 0, 0);

  // console.log(getCoors(testVector3));

  let warp = null;
  let lastFishingState = -1;
  
  Interceptor.attach(il2cpp.add("0xd9e0f0"), {
    onEnter: function (args) {
      // console.log("isMyActor", isMyActor(args[0]));
      console.log("SendToSyncPlayerJump", args[0], args[1]);
      // console.log("Suid", getSuid(args[0]));
      // setInvisible(args[0], 1);

      // warpToSpawn(args[0]);

      // if (warp) {
      //   console.log(warp);
      //   sendToSyncPlayerWarp(args[0], warp[0], warp[1].toInt32());
      // }
    },
  });

  // Interceptor.attach(il2cpp.add("0x2A4A744"), {
  //   onEnter: function (args) {
  //     // console.log("Warp", args[0], args[1], args[2]);
  //     // console.log(JSON.stringify(this.context));

  //     let context = JSON.parse(JSON.stringify(this.context));

  //     for (let k of Object.keys(context))
  //       if (vectorSet.has(context[k])) {
  //         console.log("Warp", k, JSON.stringify(getCoors(this.context[k])));
  //       }
  //   },
  // });

  // Interceptor.attach(il2cpp.add("0xC33B34"), {
  //   onEnter: function (args) {
  //     console.log("WarpToFriendPos", args[0], args[1], args[2]);

  //     let context = JSON.parse(JSON.stringify(this.context));

  //     for (let k of Object.keys(context))
  //       if (vectorSet.has(context[k])) {
  //         console.log(
  //           "WarpToFriendPos",
  //           k,
  //           JSON.stringify(getCoors(this.context[k]))
  //         );
  //       }
  //   },
  // });

  Interceptor.attach(il2cpp.add("0xdb7548"), {
    onEnter: function (args) {
      let state = args[1].toInt32();

      send({
        type: "updateFishingState",
        state,
      });

      // console.log("UpdateFishingState", lastFishingState, state);

      // lastFishingState = state;
    },
  });

  // Interceptor.attach(il2cpp.add("0xda7234"), {
  //   onEnter: function (args) {
  //     console.log('Casting fail chat', args[0]);
  //   },
  // });

  // Interceptor.attach(il2cpp.add("0xcabfc8"), {
  //   onEnter: function (args) {
  //     console.log("SendChatMessage", args[0], args[2], args[3]);
  //     console.log(args[1].add('0xC').readUtf16String());
  //   },
  // });

  // Interceptor.attach(il2cpp.add("0xb62dec"), {
  //   onEnter: function (args) {
  //     console.log(JSON.stringify(this.context));

  //     console.log("setChat", args[0]);
  //     console.log(args[1]);
  //     // console.log(args[9].readByteArray(100));
  //     // console.log(args[9].add("0xC").readUtf16String());
  //   },
  // });

  // Interceptor.attach(il2cpp.add("0xC4D6A0"), {
  //   onEnter: function (args) {
  //     console.log("OnClickFishing", args[0]);

  //     // setTimeout(() => {
  //     //   onClickLift(args[0], 1);
  //     // }, 2000);
  //   },
  // });

  // Interceptor.attach(il2cpp.add("0xC4E914"), {
  //   onEnter: function (args) {
  //     console.log("OnClickLift", args[1]);
  //   },
  // });

  // Interceptor.attach(il2cpp.add("0xC35E78"), {
  //   onEnter: function (args) {
  //     console.log("isMyActor", isMyActor(args[0]));

  //     for (let k of Object.keys(this.context))
  //       if (vectorSet.has(this.context[k].toString())) {
  //         console.log(
  //           "SendToSyncPlayerWarp",
  //           k,
  //           JSON.stringify(getCoors(this.context[k])),
  //         );
  //       }
      
  //     args[1] = ptr(0x0);
  //     args[2] = ptr(0x0);
  //     args[3] = ptr(0x0);

  //     console.log(args[1].readByteArray(100));

  //     console.log(
  //       "SendToSyncPlayerWarp",
  //       JSON.stringify(this.context)
  //     );

  //     let arr = [];

  //     for (let i = 0; i < 10; i++)
  //       arr.push(args[i].toString());

  //     console.log(arr.join(' '));
  //   },
  // });

  // Interceptor.attach(il2cpp.add("0xC33C5C"), {
  //   onEnter: function (args) {
  //     console.log("SendToSyncPlayerMovement", parseFloat(args[0].readFloat()));
  //   },
  // });

  // Interceptor.attach(il2cpp.add("0xC3BFB8"), {
  //   onEnter: function (args) {
  //     console.log("get_CatchFishID", args[0].readUInt());
  //   },
  // });
  
  // Interceptor.attach(il2cpp.add("0x2B45418"), {
  //   onEnter: function (args) {
  //     console.log("get_GetPoleInfo", args[0]);
  //   },
  // });

  // Interceptor.attach(il2cpp.add("0xC360D8"), {
  //   onEnter: function (args) {
  //     console.log("SendToSyncPlayerFishingAction");
  //   },
  // });

  let lastTouched = null;

  let fishTouchHookObj = {
    onEnter: function (args) {
      // console.log(args[0].add("0x44").add("0x2C").readInt());

      fish = args[0].toString();

      let difficulty = args[0].add("0x44").readPointer();
      let touches = args[0].add("0x4C").readInt();

      //let height = args[0].add("0x34").readFloat();

      let level = difficulty.add("0x2C").readInt();
      let difficultyId = difficulty.add("0x8").readInt();
      let fightTime = difficulty.add("0x24").readFloat();
      let hitTime = difficulty.add("0x28").readFloat();
      //let bundleName = difficulty.add("0x34").readPointer();

      if (touches != lastTouched) {
        //console.log(bundleName.readByteArray(100));
        
        /*
        console.log(
          JSON.stringify({
            touches,
            height,
            level,
            searchRemainTime,
            traverseDirRight,
            fightTime,
            hitTime,
            difficultyId,
            //bundleName,
          })
        );
        */

        //console.log(args[0].readByteArray(200));
        lastTouched = touches;
        
        send({
          type: "fishTouch",
          touchesLeft: touches,
          level,
          fightTime,
          hitTime,
          difficultyId,
        });
      }

      // console.log("FishShadowController PlayIdle");
    },
  };

  // Interceptor.attach(il2cpp.add("0xd7dfb0"), fishTouchHookObj);

  // Interceptor.attach(il2cpp.add("0xd7f3b4"), fishTouchHookObj);
  
  // Interceptor.attach(il2cpp.add("0xd7f590"), fishTouchHookObj);

  // Interceptor.attach(il2cpp.add("0xd7f8c8"), fishTouchHookObj);

  /*
  Interceptor.attach(il2cpp.add("0x2B442D0"), {
    onEnter: function (args) {
      this.shadowLevel = args[1].toInt32();

      // console.log("FishShadowController GetFishShadow", args[0], args[1].toInt32());
    },
    onLeave: function (retval) {
      // console.log(retval.toString(), this.shadowLevel);

      shadowMap[retval.toString()] = this.shadowLevel;

      // if (retval.toString() == fish)
      //   console.log("Level: ", this.shadowLevel);
    }
  });
  */

  // Interceptor.attach(il2cpp.add("0x2B41C5C"), {
  //   onEnter: function (args) {
  //     // console.log(args[0].add("0x44").add("0x2C").readInt());
  //     // console.log(args[0].add("0x34").readInt());

  //     // console.log(
  //     //   JSON.stringify({
  //     //     fish: args[0].toInt32(),
  //     //     bruh: args[0].add("0x50").readFloat(),
  //     //     bites: args[0].add("0x4C").readInt(),
  //     //   })
  //     // );

  //     if (args[0].toString() == fish) {

  //       console.log("FishShadowController PlayFight", fish);
  //     }
  //   },
  // });

  // Interceptor.attach(il2cpp.add("0xd801dc"), {
  //   onEnter: function (args) {
  //     console.log("FishShadowController Fight");
  //   },
  // });

  // Interceptor.attach(il2cpp.add("0x2B3FDBC"), {
  //   onEnter: function (args) {
  //     console.log("FishShadowController get_ShadowID");
  //   },
  // });

  // Interceptor.attach(il2cpp.add("0x2B3FDD0"), {
  //   onEnter: function (args) {
  //     console.log("FishShadowController Awake", args[0]);
  //   },
  // });

  // Interceptor.attach(il2cpp.add("0x2B4522C"), {
  //   onEnter: function (args) {
  //     console.log("FishShadowController OnDestroy", args[0]);
  //   },
  // });

  // Interceptor.attach(il2cpp.add("0x126B640"), {
  //   onEnter: function (args) {
  //     console.log("FishingDifficulty set_FishShadowSize", args[0].readInt());
  //   },
  // });

  // Interceptor.attach(il2cpp.add("0x2B4542C"), {
  //   onEnter: function (args) {
  //     console.log(
  //       "FishingPoleController Attach",
  //       args[2].toInt32()
  //     );
  //   },
  // });

  Interceptor.attach(il2cpp.add("0xdb6138"), {
    onEnter: function (args) {
      console.log("ActorDefaultControlPlayer DetachFishingPole");

      send({
        type: 'detachFishingPole'
      })
    },
  });

  // Interceptor.attach(il2cpp.add("0xae0134"), {
  //   onEnter: function (args) {
  //     console.log("ResourceProgress Update");
  //     console.log(args[0].add("0xc").readPointer().add("0xc").readUtf16String());
  //   },
  // });

  // Interceptor.attach(il2cpp.add("0xab41f0"), {
  //   onEnter: function (args) {
  //     console.log("ChatSystem OnChatBroadCast");
  //     // console.log(JSON.stringify(this.context));
  //     // console.log(this.context.r4.readByteArray(100));
  //     console.log(this.context.r6.add("0xC").readUtf16String());
  //     // console.log(this.context.r7.readByteArray(100));
  //   },
  // });

  Interceptor.attach(il2cpp.add("0xdb4544"), {
    onEnter: function (args) {
      console.log("ActorDefaultControlPlayer SetAccelerator");
    },
  });

  Interceptor.attach(il2cpp.add("0xdfe808"), {
    onEnter: function (args) {
      console.log("SpawnManager get_IsLoading");
    },
  });

  Interceptor.attach(il2cpp.add("0x10f830c"), {
    onEnter: function (args) {
      console.log("LoginAccountControl StartLoginAccount");
    },
  });
  
  let onClickFishing = new NativeFunction(il2cpp.add("0xdb62d0"), "void", ["pointer"]);
  let onJump = new NativeFunction(il2cpp.add("0xdb2abc"), "void", ["pointer"]);
  let escapeToSpawn = new NativeFunction(il2cpp.add("0xdb45e8"), "void", [
    "pointer",
  ]);

  Interceptor.attach(il2cpp.add("0xdb62d0"), {
    onEnter: function (args) {
      console.log("ActorDefaultControlPlayer OnClickFishing");

      // escapeToSpawn(args[0]);
    },
  });
  
  Interceptor.attach(il2cpp.add("0xdb2abc"), {
    onEnter: function (args) {
      console.log("ActorDefaultControlPlayer OnJump");

      // escapeToSpawn(args[0]);

      send({
        type: 'onJump'
      });
    },
  });
  
  Interceptor.attach(il2cpp.add("0xdb3e64"), {
    onEnter: function (args) {
      console.log("ActorDefaultControlPlayer SetPositionAndRotationWithScale");
    },
  });

  Interceptor.attach(il2cpp.add("0xd9e510"), {
    onEnter: function (args) {
      console.log("ActorControl SendToSyncPlayerWarp");
    },
  });

  Interceptor.attach(il2cpp.add("0xd97924"), {
    onEnter: function (args) {
      console.log("ActorCharacterControl MoveToPlayerWarp");
    },
  });

  Interceptor.attach(il2cpp.add("0xd97a88"), {
    onEnter: function (args) {
      console.log("ActorCharacterControl MoveToOtherPlayerWarp");
    },
  });

  Interceptor.attach(il2cpp.add("0x2ceba9c"), {
    onEnter: function (args) {
      console.log("VehicleControlOther HandleToWarp");
    },
  });
  
  Interceptor.attach(il2cpp.add("0xda95e0"), {
    onEnter: function (args) {
      console.log("ActorDefaultControlOther HandleToWarp");
    },
  });

  Interceptor.attach(il2cpp.add("0xb0ab6c"), {
    onEnter: function (args) {
      console.log("ActorUnderDogsOther HandleToWarp");
    },
  });
  
  // Interceptor.attach(il2cpp.add("0xdad3e0"), {
  //   onEnter: function (args) {
  //     console.log("ActorDefaultControlOther UpdateToSyncPlayerMovement_Warp");
  //   },
  // });

  Interceptor.attach(il2cpp.add("0xda20dc"), {
    onEnter: function (args) {
      console.log("ActorControl HandleToWarp");
    },
  });

  Interceptor.attach(il2cpp.add("0xdb4090"), {
    onEnter: function (args) {
      console.log("ActorDefaultControlPlayer WarpToFriendPos");
    },
  });

  // Interceptor.attach(il2cpp.add("0xdb2bf0"), {
  //   onEnter: function (args) {
  //     console.log("ActorDefaultControlPlayer SetSpawnPositionAndRotation");
  //     // console.log(JSON.stringify(this.context));

  //     // x
  //     this.context.r1 = ptr(0x43720000);
  //     // this.context.r2 = ptr(0x01000000);
  //     // y
  //     this.context.r3 = ptr(0x41c00000);
  //     // this.context.r4 = ptr(0x10000000);
  //     // z
  //     // this.context.r5 = ptr(0x06000000);
  //     // this.context.r6 = ptr(0xf0000000);
      
  //     // this.context.r7 = ptr(0x41000000);

  //     // console.log(JSON.stringify(this.context));

  //     send({
  //       type: "setSpawnPositionAndRotation",
  //     });
  //   },
  // });

  Interceptor.attach(il2cpp.add("0xdb3160"), {
    onEnter: function (args) {
      console.log("ActorDefaultControlPlayer ChangeStance");
    },
  });
  
  Interceptor.attach(il2cpp.add("0xdb06ec"), {
    onEnter: function (args) {
      console.log("ActorDefaultControlPlayer Initialize");
    },
  });

  Interceptor.attach(il2cpp.add("0x1561334"), {
    onEnter: function (args) {
      console.log("ItemRepairA get_UseCount");
    },
  });

  // Interceptor.attach(il2cpp.add("0x2ca3b40"), {
  //   onEnter: function (args) {
  //     console.log("NavMeshAgent Warp");
  //   },
  // });

  // Interceptor.attach(il2cpp.add("0xdb4170"), {
  //   onEnter: function (args) {
  //     console.log("ActorDefaultControlPlayer PlayToMoveDust");
  //   },
  // });

  Interceptor.attach(il2cpp.add("0x1066588"), {
    onEnter: function (args) {
      console.log("MyCharacterMoveTarget OnStart");

      // escapeToSpawn(args[0]);
    },
  });
  
  // Interceptor.attach(il2cpp.add("0xdb9c48"), {
  //   onEnter: function (args) {
  //     console.log("ActorDefaultControlPlayer CatchResult", args[1], args[2].toInt32());
  //   },
  // });

  Interceptor.attach(il2cpp.add("0xdb42ec"), {
    onEnter: function (args) {
      console.log("ActorDefaultControlPlayer SetDeltaMove");
    },
  });

  // Interceptor.attach(il2cpp.add("0x2AE6198"), {
  //   onEnter: function (args) {
  //     console.log(
  //       "HeadUp3DNickName SetToNickname",
  //       args[0]
  //       );
      
  //     console.log(args[1].add(0xc).readUtf16String());
  //   },
  // });

  // Interceptor.attach(il2cpp.add("0x2B403F8"), {
  //   onEnter: function (args) {
  //     console.log("FishShadowController ChangeState");
  //   }
  // });

  Interceptor.attach(il2cpp.add("0xdb600c"), {
    onEnter: function (args) {
      console.log("ActorDefaultControlPlayer AttachFishingPole");
      
      // console.log(args[1]);

      send({
        type: "attachFishingPole"
      });
    },
  });

  Interceptor.attach(il2cpp.add("0xd848b0"), {
    onLeave: function (retval) {
      retval.replace(ptr(0));
      
      console.log("FishingSystem get_IsFishingCountOver", retval);
    },
  });

  // Interceptor.attach(il2cpp.add("0xc03f70"), {
  //   onEnter: function (args) {
  //     console.log("FriendSystem SendToServerPlayerLike", args[1], args[2]);
  //     console.log(this.context.r2.toInt32());
  //     console.log(JSON.stringify(this.context));
  //   },
  // });

  let userInstance = null;

  let sendToServerPlayerLike = new NativeFunction(il2cpp.add("0x924184"), 'void', ['pointer', 'int64']);

  Interceptor.attach(il2cpp.add("0x924184"), {
    onEnter: function (args) {
      console.log("NetNativeProtocol SendToServerPlayerLike", args[1]);
      console.log(this.context.r2.toInt32());
      userInstance = this.context.r0;
      this.context.r2 = ptr(0);
      sendToServerPlayerLike(ptr(userInstance), int64(this.context.r2));
      console.log(JSON.stringify(this.context));
    },
  });

  Interceptor.attach(il2cpp.add("0x9fc338"), {
    onEnter: function (args) {
      console.log("InGameNotificationSystem AddLike", args[1], args[2]);
      console.log(this.context.r2.toInt32());
      console.log(JSON.stringify(this.context));
    },
  });

  // Interceptor.attach(il2cpp.add("0x2B4423C"), {
  //   // onEnter: function (args) {
  //   //   console.log("FishingSystem get_Self", args[0].add("0x28").readByteArray(1));
  //   // },
  //   onLeave: function(retval) {
  //     console.log(
  //       "FishingSystem get_Self",
  //       retval.add("0x28").readByteArray(1)
  //     );
  //   }
  // });

  // Interceptor.attach(il2cpp.add("0x2B42888"), {
  //   onEnter: function (args) {
  //     console.log(
  //       "FishingFloatController PlayCasting",
  //       args[0],
  //       (args[1].add("0x1F8").readU8() & (1 << 7) ? 1 : 0),
  //       args[1].add("0x1E8").readInt(),
  //       args[2]
  //     );
  //   },
  // });

  // Interceptor.attach(il2cpp.add("0x2B44158"), {
  //   onEnter: function (args) {
  //     console.log("FishingFloatController SetFishLevel", args[0].readUInt());
  //   },
  // });

  // Interceptor.attach(il2cpp.add("0x1CBAF1C"), {
  //   onEnter: function (args) {
  //     console.log("String", args[0]);
  //   }
  // });

  // Interceptor.attach(il2cpp.add("0x2C8B4B0"), {
  //   onEnter: function (args) {
  //     console.log("get_Nickname", args[0]);
  //   },
  // });

  // Interceptor.attach(il2cpp.add("0x2B482A8"), {
  //   onEnter: function (args) {
  //     console.log("FishingActionBraodcast", args[1].toInt32());
  //     console.log(args[2]);
  //   },
  // });

  // let getCatchFishSize = new NativeFunction(il2cpp.add("0x2B46AD0"), 'int', ['pointer']);

  Interceptor.attach(il2cpp.add("0xd85698"), {
    onEnter: function (args) {
      console.log(
        "ReceiveFishingCatch"
        // args[0].add("0x801EBC").readUInt(),
        // args[0].add("0x801F5C").readUInt()
      );

      // console.log("Fish size", getCatchFishSize(args[0]));

      // let autoFishing = args[0].add("0x30").readInt();

      // console.log('Auto fishing', autoFishing);

      // args[0].add("0x30").writeInt(0);

      // console.log("Auto fishing1", args[0].add("0x30").readInt());

      const fishId = args[1].add("0x14").readUInt();

      let success = args[1].add("0x10").readInt();
      let fishId1 = fishId - 33000000;

      console.log(fishId1);

      let fishName = "";
      if (fishId == 26010010) fishName = "Old Doll";
      else if (fishId == 26010009) fishName = "Broken Car Door";
      else {
        if (fishId1 > 500) {
          fishId1 -= 500;
          fishName += "Crowned ";
        }

        fishName += fishes[fishId1 - 1];
      }

      console.log(fishName);
      // console.log(args[1].add("0x14").readByteArray(100));
      console.log("Success:", success);

      send({
        type: "receiveFishingCatch",
        fishId,
        fishName,
        success,
      });
    },
  });

  
  // let getInvisible = new NativeFunction(il2cpp.add("0xC33B48"), "bool", ['pointer']);
  
  // Interceptor.attach(il2cpp.add("0xC32804"), {
  //   onEnter: function (args) {
  //     // console.log(args[0], args[1]);
  //     // console.log(JSON.stringify({ invisile: getInvisible(args[0]) }));
  //     // console.log("get_IsMyActor");
  //   },
  //   onLeave: function (retval) {
  //     // console.log(JSON.stringify(this.context));

  //     if (retval.toInt32())
  //       console.log("get_IsMyActor", retval);
  //   },
  // });

  // Interceptor.attach(il2cpp.add("0x2974F9C"), {
  //   onEnter: function (args) {
  //     console.log("Log", args[0].readPointer().readUtf8String());
  //   },
  // });

  // let res = setInvisible(true);

  // Java.perform(function () {
  // })

  // Interceptor.attach(il2cpp.add("0xC34650"), {
  //   onEnter: function (args) {
  //     console.log(
  //       JSON.stringify([
  //         "SendToSyncPlayerMovement_City",
  //         args[0].readFloat(),
  //       ])
  //     );
  //   },
  // });
});
