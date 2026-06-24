/**
 * The Shadowbox QuickTime player class.
 *
 * This file is part of Shadowbox.
 *
 * Shadowbox is an online media viewer application that supports all of the
 * web's most popular media publishing formats. Shadowbox is written entirely
 * in JavaScript and CSS and is highly customizable. Using Shadowbox, website
 * authors can showcase a wide assortment of media in all major browsers without
 * navigating users away from the linking page.
 *
 * You should have received a license with this distribution explaining the terms
 * under which Shadowbox may be used. If you did not, you may obtain a copy of the
 * license at http://shadowbox-js.com/license.txt
 *
 * @author      Michael J. I. Jackson <michael@mjijackson.com>
 * @copyright   2007-2009 Michael J. I. Jackson
 * @version     SVN: $Id: shadowbox-qt.js 6 2009-04-07 19:31:32Z mjijackson.com $
 */

(function(){

    var S = Shadowbox,
        controller_height = 16; // height of QuickTime controller

    /**
     * Constructor. This class is used to display QuickTime movies.
     *
     * @param   Object      obj     The content object
     * @public
     */
    S.qt = function(obj){
        this.obj = obj;

        // height/width default to 300 pixels
        this.height = obj.height ? parseInt(obj.height, 10) : 300;
        if(S.options.showMovieControls == true)
            this.height += controller_height;
        this.width = obj.width ? parseInt(obj.width, 10) : 300;
    }

    S.qt.prototype = {

        /**
         * Appends this movie to the document.
         *
         * @param   HTMLElement     body    The body element
         * @param   String          id      The content id
         * @param   Object          dims    The current Shadowbox dimensions
         * @return  void
         * @public
         */
        append: function(body, id, d){
            this.id = id;

            var opt = S.options,
                autoplay = String(opt.autoplayMovies),
                controls = String(opt.showMovieControls);

            var movie = document.createElement('object');
            movie.id = id;
            movie.name = id;
            movie.height = this.height; // height includes controller
            movie.width = this.width;
            movie.kioskmode = 'true';

            if(S.client.isIE){
                movie.classid = 'clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B';
                movie.codebase = 'http://www.apple.com/qtactivex/qtplugin.cab#version=6,0,2,0';
            }else{
                movie.type = 'video/quicktime';
                movie.data = this.obj.content;
            }

            var params = {
                src:        this.obj.content,
                scale:      'aspect',
                controller: controls,
                autoplay:   autoplay
            }, param;
            for(var p in params){
                param = document.createElement('param');
                param.name = p;
                param.value = params[p];
                movie.appendChild(param);
            }

            body.appendChild(movie);
        },

        /**
         * Removes this movie from the document.
         *
         * @return  void
         * @public
         */
        remove: function(){
            var id = this.id;

            try{
                document[id].Stop(); // stop QT video stream
            }catch(e){}

            var el = document.getElementById(id);
            if(el) S.lib.remove(el);
        }

    };

})();
