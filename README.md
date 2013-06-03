# grunt-kss

> Knyle Style Sheets living styleguide generator.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-kss --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-kss');
```

## KSS task

_Run this task with the `grunt kss` command._  
Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### options.template
Type: `String`
Default value: ``

If you want to use your own template, set these options to determine the path to your template directory.

#### options.styles
Type: `String`
Default value: ``

If you want to integrate your stylesheet, set these options to the location of your css|sass|less|stylus file.

#### options.preprocessor
Type: `String`  
Default value: `auto`

If options.styles is set and you want to override the automatic preprocessor detection, set this value to css|sass|scss|less|stylus.


### Examples

#### Simple
With default options.

```js
kss: {
  files: [
    {
      src: 'scss',
      dest: 'styleguide'
    }
  ]
}
```

#### Complex example
Everything together.

```js
kss: {
  options: {
    template: 'template/',
    styles: 'demo/styles.scss',
    preprocessor: 'scss'
  },
  
  files: [
    {
      src: 'scss',
      dest: 'styleguide'
    }
  ]
}
```

## Release History
 * 2013-30-05   v0.1.0   Initial version.
