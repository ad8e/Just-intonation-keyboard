var Module=globalThis.Module||(typeof Module!="undefined"?Module:{});var moduleOverrides=Object.assign({},Module);var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var ENVIRONMENT_IS_WASM_WORKER=Module["$ww"];var _scriptDir=typeof document!="undefined"&&document.currentScript?document.currentScript.src:undefined;if(ENVIRONMENT_IS_WORKER){_scriptDir=self.location.href}var scriptDirectory="";function locateFile(path){return scriptDirectory+path}var read_,readAsync,readBinary;if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}}else{}var out=console.log.bind(console);var err=console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;var wasmBinary;var noExitRuntime=true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var wasmModule;var ABORT=false;var EXITSTATUS;function assert(condition,text){if(!condition){abort(text)}}var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var INITIAL_MEMORY=16777216;assert(INITIAL_MEMORY>=65536,"INITIAL_MEMORY should be larger than STACK_SIZE, was "+INITIAL_MEMORY+"! (STACK_SIZE="+65536+")");if(Module["wasmMemory"]){wasmMemory=Module["wasmMemory"]}else{wasmMemory=new WebAssembly.Memory({"initial":INITIAL_MEMORY/65536,"maximum":INITIAL_MEMORY/65536,"shared":true});if(!(wasmMemory.buffer instanceof SharedArrayBuffer)){err("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag");if(ENVIRONMENT_IS_NODE){err("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and/or recent version)")}throw Error("bad memory")}}updateMemoryViews();INITIAL_MEMORY=wasmMemory.buffer.byteLength;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeKeepaliveCounter=0;function keepRuntimeAlive(){return noExitRuntime||runtimeKeepaliveCounter>0}function preRun(){callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;if(ENVIRONMENT_IS_WASM_WORKER)return _wasmWorkerInitializeRuntime();callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){callRuntimeCallbacks(__ATPOSTRUN__)}function addOnInit(cb){__ATINIT__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++}function removeRunDependency(id){runDependencies--;if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}var wasmBinaryFile;wasmBinaryFile="keyboard.wasm";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}function getBinaryPromise(binaryFile){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch=="function"){return fetch(binaryFile,{credentials:"same-origin"}).then(response=>{if(!response["ok"]){throw"failed to load wasm binary file at '"+binaryFile+"'"}return response["arrayBuffer"]()}).catch(()=>getBinarySync(binaryFile))}}return Promise.resolve().then(()=>getBinarySync(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>WebAssembly.instantiate(binary,imports)).then(instance=>instance).then(receiver,reason=>{err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){if(!binary&&typeof WebAssembly.instantiateStreaming=="function"&&!isDataURI(binaryFile)&&typeof fetch=="function"){return fetch(binaryFile,{credentials:"same-origin"}).then(response=>{var result=WebAssembly.instantiateStreaming(response,imports);return result.then(callback,function(reason){err(`wasm streaming compile failed: ${reason}`);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(binaryFile,imports,callback)})})}return instantiateArrayBuffer(binaryFile,imports,callback)}function createWasm(){var info={"a":wasmImports};function receiveInstance(instance,module){wasmExports=instance.exports;wasmTable=wasmExports["w"];Module["wasmTable"]=wasmTable;addOnInit(wasmExports["o"]);wasmModule=module;removeRunDependency("wasm-instantiate");return wasmExports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"],result["module"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err(`Module.instantiateWasm callback failed with error: ${e}`);return false}}instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}var ASM_CONSTS={6180:($0,$1,$2)=>{turn_button_on_off(UTF8ToString($0),$1,$2)},6230:()=>{window.requestAnimationFrame(Module._process_button_presses)},6294:()=>performance.now(),6321:($0,$1,$2)=>{let audioContext=emscriptenGetAudioObject($0);let audioWorkletNode=emscriptenGetAudioObject($1);HEAPF32[$2>>2]=audioContext.sampleRate;audioWorkletNode.connect(audioContext.destination)},6523:$0=>{console.log(UTF8ToString($0))},6558:$0=>{let audioContext=emscriptenGetAudioObject($0);if(audioContext.state!="running"){audioContext.resume()}},6675:$0=>{comp.value=UTF8ToString($0)}};function ExitStatus(status){this.name="ExitStatus";this.message=`Program terminated with exit(${status})`;this.status=status}var _wasmWorkerDelayedMessageQueue=[];var wasmTableMirror=[];var wasmTable;var getWasmTableEntry=funcPtr=>{var func=wasmTableMirror[funcPtr];if(!func){if(funcPtr>=wasmTableMirror.length)wasmTableMirror.length=funcPtr+1;wasmTableMirror[funcPtr]=func=wasmTable.get(funcPtr)}return func};var _wasmWorkerRunPostMessage=e=>{let data=e.data,wasmCall=data["_wsc"];wasmCall&&getWasmTableEntry(wasmCall)(...data["x"])};var _wasmWorkerAppendToQueue=e=>{_wasmWorkerDelayedMessageQueue.push(e)};var _wasmWorkerInitializeRuntime=()=>{let m=Module;_emscripten_wasm_worker_initialize(m["sb"],m["sz"]);if(typeof AudioWorkletGlobalScope==="undefined"){removeEventListener("message",_wasmWorkerAppendToQueue);_wasmWorkerDelayedMessageQueue=_wasmWorkerDelayedMessageQueue.forEach(_wasmWorkerRunPostMessage);addEventListener("message",_wasmWorkerRunPostMessage)}};var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var lengthBytesUTF8=str=>{var len=0;for(var i=0;i<str.length;++i){var c=str.charCodeAt(i);if(c<=127){len++}else if(c<=2047){len+=2}else if(c>=55296&&c<=57343){len+=4;++i}else{len+=3}}return len};var stringToUTF8Array=(str,heap,outIdx,maxBytesToWrite)=>{if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343){var u1=str.charCodeAt(++i);u=65536+((u&1023)<<10)|u1&1023}if(u<=127){if(outIdx>=endIdx)break;heap[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;heap[outIdx++]=192|u>>6;heap[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;heap[outIdx++]=224|u>>12;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}else{if(outIdx+3>=endIdx)break;heap[outIdx++]=240|u>>18;heap[outIdx++]=128|u>>12&63;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}}heap[outIdx]=0;return outIdx-startIdx};var stringToUTF8=(str,outPtr,maxBytesToWrite)=>stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite);var stringToNewUTF8=str=>{var size=lengthBytesUTF8(str)+1;var ret=_malloc(size);if(ret)stringToUTF8(str,ret,size);return ret};Module["stringToNewUTF8"]=stringToNewUTF8;var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;var UTF8ArrayToString=(heapOrArray,idx,maxBytesToRead)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.buffer instanceof SharedArrayBuffer?heapOrArray.slice(idx,endPtr):heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var UTF8ToString=(ptr,maxBytesToRead)=>ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):"";var ___assert_fail=(condition,filename,line,func)=>{abort(`Assertion failed: ${UTF8ToString(condition)}, at: `+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])};var _abort=()=>{abort("")};var readEmAsmArgsArray=[];var readEmAsmArgs=(sigPtr,buf)=>{readEmAsmArgsArray.length=0;var ch;while(ch=HEAPU8[sigPtr++]){var wide=ch!=105;wide&=ch!=112;buf+=wide&&buf%8?4:0;readEmAsmArgsArray.push(ch==112?HEAPU32[buf>>2]:ch==105?HEAP32[buf>>2]:HEAPF64[buf>>3]);buf+=wide?8:4}return readEmAsmArgsArray};var runEmAsmFunction=(code,sigPtr,argbuf)=>{var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)};var _emscripten_asm_const_double=(code,sigPtr,argbuf)=>runEmAsmFunction(code,sigPtr,argbuf);var _emscripten_asm_const_int=(code,sigPtr,argbuf)=>runEmAsmFunction(code,sigPtr,argbuf);var EmAudio={};var EmAudioCounter=0;var emscriptenRegisterAudioObject=object=>{EmAudio[++EmAudioCounter]=object;return EmAudioCounter};var emscriptenGetAudioObject=objectHandle=>EmAudio[objectHandle];var _emscripten_create_audio_context=options=>{let ctx=window.AudioContext||window.webkitAudioContext;options>>=2;let opts=options?{latencyHint:HEAPU32[options]?UTF8ToString(HEAPU32[options]):void 0,sampleRate:HEAP32[options+1]||void 0}:void 0;return ctx&&emscriptenRegisterAudioObject(new ctx(opts))};var _emscripten_create_wasm_audio_worklet_node=(contextHandle,name,options,callback,userData)=>{options>>=2;function readChannelCountArray(heapIndex,numOutputs){let channelCounts=[];while(numOutputs--)channelCounts.push(HEAPU32[heapIndex++]);return channelCounts}let opts=options?{numberOfInputs:HEAP32[options],numberOfOutputs:HEAP32[options+1],outputChannelCount:HEAPU32[options+2]?readChannelCountArray(HEAPU32[options+2]>>2,HEAP32[options+1]):void 0,processorOptions:{"cb":callback,"ud":userData}}:void 0;return emscriptenRegisterAudioObject(new AudioWorkletNode(EmAudio[contextHandle],UTF8ToString(name),opts))};var _emscripten_create_wasm_audio_worklet_processor_async=(contextHandle,options,callback,userData)=>{options>>=2;let audioParams=[],numAudioParams=HEAPU32[options+1],audioParamDescriptors=HEAPU32[options+2]>>2,i=0;while(numAudioParams--){audioParams.push({name:i++,defaultValue:HEAPF32[audioParamDescriptors++],minValue:HEAPF32[audioParamDescriptors++],maxValue:HEAPF32[audioParamDescriptors++],automationRate:["a","k"][HEAPU32[audioParamDescriptors++]]+"-rate"})}EmAudio[contextHandle].audioWorklet.bootstrapMessage.port.postMessage({_wpn:UTF8ToString(HEAPU32[options]),audioParams:audioParams,contextHandle:contextHandle,callback:callback,userData:userData})};var abortOnCannotGrowMemory=requestedSize=>{abort("OOM")};var _emscripten_resize_heap=requestedSize=>{var oldSize=HEAPU8.length;requestedSize>>>=0;abortOnCannotGrowMemory(requestedSize)};var _wasmWorkersID=1;var _EmAudioDispatchProcessorCallback=e=>{let data=e.data,wasmCall=data["_wsc"];wasmCall&&getWasmTableEntry(wasmCall)(...data["x"])};var _emscripten_start_wasm_audio_worklet_thread_async=(contextHandle,stackLowestAddress,stackSize,callback,userData)=>{let audioContext=EmAudio[contextHandle],audioWorklet=audioContext.audioWorklet;let audioWorkletCreationFailed=()=>{getWasmTableEntry(callback)(contextHandle,0,userData)};if(!audioWorklet){return audioWorkletCreationFailed()}audioWorklet.addModule("keyboard.aw.js").then(()=>{audioWorklet.bootstrapMessage=new AudioWorkletNode(audioContext,"message",{processorOptions:{"$ww":_wasmWorkersID++,"wasm":wasmModule,"wasmMemory":wasmMemory,"sb":stackLowestAddress,"sz":stackSize}});audioWorklet.bootstrapMessage.port.onmessage=_EmAudioDispatchProcessorCallback;return audioWorklet.addModule(Module["mainScriptUrlOrBlob"]||_scriptDir)}).then(()=>{getWasmTableEntry(callback)(contextHandle,1,userData)}).catch(audioWorkletCreationFailed)};var SYSCALLS={varargs:undefined,get(){var ret=HEAP32[+SYSCALLS.varargs>>2];SYSCALLS.varargs+=4;return ret},getp(){return SYSCALLS.get()},getStr(ptr){var ret=UTF8ToString(ptr);return ret}};var _fd_close=fd=>52;var convertI32PairToI53Checked=(lo,hi)=>hi+2097152>>>0<4194305-!!lo?(lo>>>0)+hi*4294967296:NaN;function _fd_seek(fd,offset_low,offset_high,whence,newOffset){var offset=convertI32PairToI53Checked(offset_low,offset_high);return 70}var printCharBuffers=[null,[],[]];var printChar=(stream,curr)=>{var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}};var _fd_write=(fd,iov,iovcnt,pnum)=>{var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0};var initRandomFill=()=>{if(typeof crypto=="object"&&typeof crypto["getRandomValues"]=="function"){return view=>(view.set(crypto.getRandomValues(new Uint8Array(view.byteLength))),view)}else abort("initRandomDevice")};var randomFill=view=>(randomFill=initRandomFill())(view);var _getentropy=(buffer,size)=>{randomFill(HEAPU8.subarray(buffer,buffer+size));return 0};var _proc_exit=code=>{EXITSTATUS=code;if(!keepRuntimeAlive()){ABORT=true}quit_(code,new ExitStatus(code))};var exitJS=(status,implicit)=>{EXITSTATUS=status;_proc_exit(status)};var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var wasmImports={b:___assert_fail,c:_abort,k:_emscripten_asm_const_double,d:_emscripten_asm_const_int,h:_emscripten_create_audio_context,j:_emscripten_create_wasm_audio_worklet_node,i:_emscripten_create_wasm_audio_worklet_processor_async,f:_emscripten_resize_heap,g:_emscripten_start_wasm_audio_worklet_thread_async,n:_fd_close,l:_fd_seek,e:_fd_write,m:_getentropy,a:wasmMemory};var wasmExports=createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports["o"])();var _process_button_presses=Module["_process_button_presses"]=a0=>(_process_button_presses=Module["_process_button_presses"]=wasmExports["p"])(a0);var _malloc=Module["_malloc"]=a0=>(_malloc=Module["_malloc"]=wasmExports["q"])(a0);var _play_string=Module["_play_string"]=a0=>(_play_string=Module["_play_string"]=wasmExports["r"])(a0);var _play_string_keyboard=Module["_play_string_keyboard"]=a0=>(_play_string_keyboard=Module["_play_string_keyboard"]=wasmExports["s"])(a0);var _play_interruptible_note=Module["_play_interruptible_note"]=(a0,a1)=>(_play_interruptible_note=Module["_play_interruptible_note"]=wasmExports["t"])(a0,a1);var _mute_interruptible_note=Module["_mute_interruptible_note"]=a0=>(_mute_interruptible_note=Module["_mute_interruptible_note"]=wasmExports["u"])(a0);var _main=Module["_main"]=(a0,a1)=>(_main=Module["_main"]=wasmExports["v"])(a0,a1);var ___errno_location=()=>(___errno_location=wasmExports["__errno_location"])();var _emscripten_wasm_worker_initialize=Module["_emscripten_wasm_worker_initialize"]=(a0,a1)=>(_emscripten_wasm_worker_initialize=Module["_emscripten_wasm_worker_initialize"]=wasmExports["x"])(a0,a1);var stackSave=()=>(stackSave=wasmExports["y"])();var stackRestore=a0=>(stackRestore=wasmExports["z"])(a0);var stackAlloc=a0=>(stackAlloc=wasmExports["A"])(a0);Module["stackAlloc"]=stackAlloc;Module["stackSave"]=stackSave;Module["stackRestore"]=stackRestore;var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}if(ENVIRONMENT_IS_WASM_WORKER){return initRuntime()}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(shouldRunNow)callMain();postRun()}{doRun()}}var shouldRunNow=true;run();