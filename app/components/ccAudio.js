'use strict';

angular.module('ccApp')
  .directive('ccAudio', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var scale_1 = ["D4", "E4", "F4", "G4", "A5", "Bb5", "C5"];
        var scale_2 = ["D3", "A3", "C4"];

        // var osc = new Tone.Oscillator(440, "triangle");
        //
        // // feedback
        // var feedbackDelay = new Tone.PingPongDelay("8n", 0.6);
        // osc.connect(feedbackDelay);
        // feedbackDelay.toMaster();
        // feedbackDelay.wet.value = 0.8;
        //
        // // panner
        // var panner = new Tone.AutoPanner(0.5);
        // panner.toMaster();
        // panner.dry = 0.3;
        // osc.connect(panner);
        //
        // // envelope
        // // var env = new Tone.Envelope(2.5, 0.1, 0.1, 0.2);
        // var env = new Tone.Envelope({
        // 	"attack" : 2.0,
        // 	"decay" : 0.1,
        // 	"sustain" : 0.1,
        // 	"release" : 0.2
        // });
        // env.connect(osc.frequency);
        //
        // //connect it to the output
        // osc.volume.value = -35;
        // osc.toMaster();
        // osc.start();

        var osc_bg = new Tone.Oscillator(440, "sine");
        osc_bg.toMaster();
        osc_bg.start();
        osc_bg.volume.value = -13;

        // vibrato
        var vibrato = new Tone.LFO(6, -25, 25);
        vibrato.start();
        vibrato.connect(osc_bg.detune);

        // feedback
        var feedbackDelay = new Tone.PingPongDelay("8n", 0.2);
        osc_bg.connect(feedbackDelay);
        feedbackDelay.toMaster();
        feedbackDelay.wet.value = 0.8;

        Tone.Transport.loopEnd = "1m";
        Tone.Transport.loop = true;
        Tone.Transport.setInterval(function(time){

        	var index = Math.floor( Math.random() * scale_1.length );
        	var freq = osc_bg.noteToFrequency( scale_1[ index ] );
            osc_bg.frequency.value = freq;
        }, "2n");

        // Tone.Transport.setInterval(function(time){
        // 	var index = Math.floor( Math.random() * scale_2.length );
        // 	var freq = osc_bg.noteToFrequency( scale_2[ index ] );
        // 	// g_objs.get("head").osc.frequency.value = freq;
        //   osc.frequency.value = freq;
        //
        // }, "16n");

        Tone.Transport.start();
      }
    };
  });
