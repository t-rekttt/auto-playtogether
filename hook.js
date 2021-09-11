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
    console.log("Address found:", addr);

    if (addr) {
      clearInterval(i);
      callback(+addr);
    }
  }, 0);
}

var il2cpp = null;

awaitForCondition(function (base) {
  il2cpp = ptr(base);

  let fish = null;
  let shadowMap = {};
  let isMyActor = new NativeFunction(il2cpp.add("0xC32804"), 'bool', ['pointer']);
  let setInvisible = new NativeFunction(il2cpp.add("0xC33B50"), "void", [
    "pointer",
    "bool",
  ]);
  let getSuid = new NativeFunction(il2cpp.add("0xC327E4"), 'long', [
    'pointer'
  ]);
  let sendToSyncPlayerWarp = new NativeFunction(
    il2cpp.add("0xC35E78"), "void", ["pointer", "pointer", "float"]
  );
  let warpToSpawn = new NativeFunction(il2cpp.add("0xA91298"), "void", ["pointer"]);
  let onClickLift = new NativeFunction(il2cpp.add("0xC4E914"), "void", [
    "pointer",
    "long"
  ]);

  let warp = null;
  let lastFishingState = -1;
  
  // Interceptor.attach(il2cpp.add("0xC35A58"), {
  //   onEnter: function (args) {
  //     console.log("isMyActor", isMyActor(args[0]));
  //     console.log("SendToSyncPlayerJump", args[0], args[1]);
  //     console.log("Suid", getSuid(args[0]));
  //     setInvisible(args[0], 1);

  //     // warpToSpawn(args[0]);

  //     // if (warp) {
  //     //   console.log(warp);
  //     //   sendToSyncPlayerWarp(args[0], warp[0], warp[1].toInt32());
  //     // }
  //   },
  // });

  Interceptor.attach(il2cpp.add("0xC33B34"), {
    onEnter: function (args) {
      console.log("WarpToFriendPos", args[0], args[1], args[2]);
    },
  });

  Interceptor.attach(il2cpp.add("0xC4E918"), {
    onEnter: function (args) {
      let state = args[1].toInt32();

      send({
        type: "updateFishingState",
        state
      });

      console.log("UpdateFishingState", lastFishingState, state);
      
      lastFishingState = state;
    },
  });
  
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

  function parseFloat(str, radix) {
    var parts = str.split(".");
    if (parts.length > 1) {
      return (
        parseInt(parts[0], radix) +
        parseInt(parts[1], radix) / Math.pow(radix, parts[1].length)
      );
    }
    return parseInt(parts[0], radix);
  }

  Interceptor.attach(il2cpp.add("0xC35E78"), {
    onEnter: function (args) {
      console.log("isMyActor", isMyActor(args[0]));
      console.log(
        "SendToSyncPlayerWarp",
        args[0],
        args[1],
        args[2].toInt32()
      );

      if (!warp)
        warp = [args[1], args[2]];
      else {
        args[1] = warp[0];
        args[2] = warp[1];
      }
    },
  });

  Interceptor.attach(il2cpp.add("0xC33C5C"), {
    onEnter: function (args) {
      console.log("SendToSyncPlayerMovement", parseFloat(args[0].readFloat()));
    },
  });

  Interceptor.attach(il2cpp.add("0xC3BFB8"), {
    onEnter: function (args) {
      console.log("get_CatchFishID", args[0].readUInt());
    },
  });
  
  Interceptor.attach(il2cpp.add("0x2B45418"), {
    onEnter: function (args) {
      console.log("get_GetPoleInfo", args[0]);
    },
  });

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

      let touches = args[0].add("0x4C").readInt();
      let height = args[0].add("0x34").readInt();
      let level = shadowMap[args[0].toString()];

      if (touches != lastTouched) {
        console.log(touches, height, level);
        lastTouched = touches;
        
        send({
          type: "fishTouch",
          touchesLeft: touches,
          level,
        });
      }

      // console.log("FishShadowController PlayIdle");
    },
  };

  Interceptor.attach(il2cpp.add("0x2B412F0"), fishTouchHookObj);
  
  Interceptor.attach(il2cpp.add("0x2B41748"), fishTouchHookObj);

  Interceptor.attach(il2cpp.add("0x2B41924"), fishTouchHookObj);

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

  Interceptor.attach(il2cpp.add("0x2B42570"), {
    onEnter: function (args) {
      console.log("FishShadowController Fight");
    },
  });

  Interceptor.attach(il2cpp.add("0x2B3FDBC"), {
    onEnter: function (args) {
      console.log("FishShadowController get_ShadowID");
    },
  });

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

  Interceptor.attach(il2cpp.add("0x126B640"), {
    onEnter: function (args) {
      console.log("FishingDifficulty set_FishShadowSize", args[0].readInt());
    },
  });

  // Interceptor.attach(il2cpp.add("0x2B4542C"), {
  //   onEnter: function (args) {
  //     console.log(
  //       "FishingPoleController Attach",
  //       args[2].toInt32()
  //     );
  //   },
  // });

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

  // Interceptor.attach(il2cpp.add("0xC3C2EC"), {
  //   onEnter: function (args) {
  //     console.log(
  //       "AttachFishingPole",
  //       args[0].add("0x88").readLong(),
  //       args[0].add("0x70").readInt()
  //     );

  //     console.log(args[0].add("0x90").readByteArray(1));
  //   }
  // });

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

  Interceptor.attach(il2cpp.add("0x2C8B4B0"), {
    onEnter: function (args) {
      console.log("get_Nickname", args[0]);
    },
  });

  // Interceptor.attach(il2cpp.add("0x2B482A8"), {
  //   onEnter: function (args) {
  //     console.log("FishingActionBraodcast", args[1].toInt32());
  //     console.log(args[2]);
  //   },
  // });

  let getCatchFishSize = new NativeFunction(il2cpp.add("0x2B46AD0"), 'int', ['pointer']);

  Interceptor.attach(il2cpp.add("0x2B476DC"), {
    onEnter: function (args) {
      console.log(
        "ReceiveFishingCatch",
        // args[0].add("0x801EBC").readUInt(),
        // args[0].add("0x801F5C").readUInt()
      );

      // console.log("Fish size", getCatchFishSize(args[0]));

      const fishId = args[1].add("0x14").readUInt();
      
      let success = args[1].add("0x10").readInt();
      let fishId1 = fishId - 33000000;
      
      console.log(fishId1);

      let fishName = '';
      if (fishId == 26010010)
        fishName = 'Old Doll';
      else if (fishId == 26010009)
        fishName = 'Broken Car Door';
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
        type: 'receiveFishingCatch',
        fishId,
        fishName,
        success
      })
    },
  });

  
  let getInvisible = new NativeFunction(il2cpp.add("0xC33B48"), "bool", ['pointer']);
  
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
