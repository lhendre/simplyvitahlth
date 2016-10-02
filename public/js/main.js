$(document).ready(function() {
    var exampleSocket = new WebSocket('ws://localhost:4000/echo');
    exampleSocket.onopen = function (event) {
        exampleSocket.send('Ping');
    }
    exampleSocket.onmessage = function (event) {
        console.log("Received", event.data);
    }
    function showEpisodePopup(notes, title) {
        $('#episode-dialog').modal('show');
    };
    function getData() {
        return new Promise(function(fulfill, reject) {
            $('#clinical tbody').empty();
            $('#clinical tbody').append($('<tr><td colspan=5 align=center><br>Loading<br><img src="images/loading.gif"><br></td></tr>'));
            setTimeout(function() {
                $.ajax({
                    method: 'get',
                    url: '/visits',
                    success: function(res) {
                        console.log(res);
                        fulfill(res);
                    },
                    error: function(res) {
                        alert('error');
                        console.log(res);
                        fulfill(JSON.parse(res.responseText));
                    }
                });
            }, 2000);
        });
    }
    var future = [
      {
        "date": null,
        "name": "Joe Ziggeler",
        "notes": null,
        "provider": "Bones Orthopaedics",
        "procedure": "Total Hip Replacement",
        "practice": "Michael Bones MD",
        "specialty": "Orthopaedic Surgery",
        "priority": 6
      }, {
        "date": null,
        "name": "Joe Ziggeler",
        "notes": null,
        "provider": null,
        "procedure": "Therapeutic Exercises",
        "practice": null,
        "specialty": "Physical Therapy",
        "priority": 7
      }, {
        "date": null,
        "name": "Joe Ziggeler",
        "notes": null,
        "provider": null,
        "procedure": "Therapeutic Exercises",
        "practice": null,
        "specialty": "Physical Therapy",
        "priority": 8
      }
    ]
    function update() {

        getData().then(function(data) {
            $('#clinical tbody').empty();
            var buttonShown = false;
            _.each(data.concat(future), function(visit) {
                var row;
                if( visit.date !== null ) {
                    row = $('<tr><td align=center>'+visit.date+'</td><td>'+visit.procedure+'</td><td>'+visit.provider+'</td><td>'+visit.practice+'</td><td>'+visit.specialty+'</td></tr>');
                    row.click(function() {
                        var notes = visit.notes;
                        var title = visit.date+' - '+visit.procedure;
                        showPopup(notes, title);
                    }).addClass('completed');
                } else {
                    if( buttonShown ) row = $('<tr><td></td><td>'+visit.procedure+'</td><td></td><td></td><td></td></tr>').addClass('future');
                    else {
                        row = row = $('<tr><td align=center><button>Add</button></td><td>'+visit.procedure+'</td><td></td><td></td><td></td></tr>').addClass('next');
                        buttonShown = true;
                        row.find('button').click(function() {
                            var title = 'Upload CCD for '+visit.procedure;
                            $('#procedure-title').text(title);
                            $('#procedure-dialog').modal('show');
                        });
                    }
                }
                $('#clinical tbody').append(row);
            });
            $('#population tbody').empty();
            var episodesCosts = [];
            var populationCost = 0;
            var noEpisodes = 10;
            for (i = 0; i < noEpisodes; i++) {
                episodesCosts.push(Math.floor(1000 + Math.random() * 9000));
                populationCost += episodesCosts[i];
            }
            averageEpisodeCost = populationCost / noEpisodes;
            _.forEach(episodesCosts, function (episodeCost) {
                var memberId = Math.floor(100000 + Math.random() * 900000);
                var providerId = Math.floor(1000000 + Math.random() * 9000000);
                var diff = episodeCost - averageEpisodeCost;
                var row = $('<tr><td>'+memberId+'</td><td>'+providerId+'</td><td>'+accounting.formatMoney(episodeCost, {
                  precision: 2,
                  thousand: ",",
                  format: {
                    pos : "%s %v",
                    neg : "%s (%v)",
                    zero: "%s  --"
                  }
                })+'</td><td ' + ((diff > 0) ? 'class="positive"' : 'class="negative"') + '>'+accounting.formatMoney(diff, {
                  precision: 2,
                  thousand: ",",
                  format: {
                  pos : "%s %v",
                  neg : "%s (%v)",
                  zero: "%s  --"
                  }
                })+'</td></tr>');
                row.click(function() {
                    showEpisodePopup();
                }).addClass('clickable');
                $('#population tbody').append(row);
            });
            $('#episode-dialog .modal-body table tbody').empty();
            var popupRows = $('#clinical').find('.completed').clone();
            $('#episode-dialog .modal-body').append('<table class="table table-striped table-bordered"></table>');
            var popupTable = $('#episode-dialog table');
            popupTable.append($('#clinical').find('thead').clone());
            popupTable.append('<tbody></tbody>').append(popupRows);
        });
    }
    function doUpload() {
        var base = future[0];
        future.splice(0, 1);
        base.date = '2016/10/02';
        base.notes = 'generated from CCD';
        base.procedure = 'Total Hip Replacement';
        $.post('/blockchain/store', base, update);
    }

    function showPopup(notes, title) {
        $('#notes-title').text(title);
        $('#notes').text(notes);
        $('#notes-dialog').modal('show');

    };
    $('#drop-target').on('dragenter', function() {
        $('#drop-target').css('border-style', 'solid');
    }).on('dragleave', function() {
        $('#drop-target').css('border-style', 'dashed');
    }).on('drop', function(ev) {
        ev.preventDefault();
        $('#procedure-dialog').modal('hide');
        doUpload();
    });
    var stopIt = function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    $(window).on("drag dragstart dragend dragover dragenter dragleave drop", stopIt);
    update();
});
