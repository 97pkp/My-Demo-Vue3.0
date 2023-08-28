<template>
    <div class="video_wrap">
        <LivePlayer 
            ref="playerCtrl" 
            :poster="poster"
            :videoUrl="videoUrl"
            :videoTitle="videoTitle"
            :controls="controls" 
            :autoplay="autoplay"
            :loop="loop"
            :alt="alt"
            :muted="muted"
            :aspect='aspect'
            :live="live"
            :fluent="fluent"
            :stretch="stretch"
            :timeout="timeout"
            :show-custom-button="showCustomButton"
            :hide-big-play-button="hideBigPlayButton"
            :hide-snapshot-button="hideSnapshotButton"
            :hide-fullscreen-button="hideFullscreenButton"
            :hide-fluent-button="hideFluentButton"
            :hide-stretch-button="hideStretchButton"
            :resolution="resolution"
            :resolutiondefault="resolutiondefault"
            :playback-rates="playbackRates"
            :playback-rate="playbackRate"
            :hasaudio="hasaudio"
            :hasvideo="hasvideo"
            :custom-buttons="customButtons"
            :autofocus="autofocus"
            :dblclick-fullscreen="dblclickFullscreen"
            :language="language"
            :water-mark="waterMark"
            oncontextmenu="return false" >
        </LivePlayer>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import LivePlayer from '@liveqing/liveplayer-v3'
const props = defineProps({
    // 视频封面图片
    poster: {
        required: false, // 是否必传
        type: String, // 类型
        default: '' // 默认值
    },
    // 视频流地址
    videoUrl: {
        required: false,
        type: String,
        default: 'https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv'
    },
    // 视频右上角显示的标题
    videoTitle: {
        required: false,
        type: String,
        default: '看大片'
    },
    // 自动播放
    autoplay: {
        required: false,
        type: Boolean,
        default: false
    },
    // 显示播放器控制栏
    controls: {
        required: false,
        type: Boolean,
        default: true
    },
    // 是否循环播放
    loop: {
        required: false,
        type: Boolean,
        default: false
    },
    // 视频流地址没有指定情况下, 视频所在区域显示的文字, 相当于 html img 标签的 alt 属性
    alt: {
        required: false,
        type: String,
        default: '无信号'
    },
    // 是否静音
    muted: {
        required: false,
        type: Boolean,
        default: false
    },
    // 视频显示区域的宽高比, fullscreen 即是全屏展示, String default '16:9'
    aspect: {
        required: false,
        type: String,
        default: 'fullscreen'
    },
    // 是否直播, 标识要不要显示进度条
    live: {
        required: false,
        type: Boolean,
        default: false
    },
    // 流畅模式
    fluent: {
        required: false,
        type: Boolean,
        default: true
    },
    // 是否拉伸
    stretch: {
        required: false,
        type: Boolean,
        default: false
    },
    // m3u8 加载超时(秒), Number default 20
    timeout: {
        required: false,
        type: Number,
        default: 20
    },
    // 是否在工具栏显示自定义按钮(极速/流畅, 拉伸/标准)
    showCustomButton: {
        required: false,
        type: Boolean,
        default: true
    },
    // 是否隐藏起播状态下的大播放按钮
    hideBigPlayButton: {
        required: false,
        type: Boolean,
        default: false
    },
    // 是否隐藏快照按钮
    hideSnapshotButton: {
        required: false,
        type: Boolean,
        default: false
    },
    // 是否隐藏全屏按钮
    hideFullscreenButton: {
        required: false,
        type: Boolean,
        default: false
    },
    // 是否隐藏 极速/流畅 按钮
    hideFluentButton: {
        required: false,
        type: Boolean,
        default: false
    },
    // 是否隐藏 拉伸/标准 按钮
    hideStretchButton: {
        required: false,
        type: Boolean,
        default: false
    },
    // HLS点播流播放时使用：需已有对应清晰度的HLS流，供选择的清晰度配置, 如 "yh,fhd,hd,sd" (说明：yh:原始分辨率，fhd:超清，hd:高清，sd:标清,不配置则不启用,需要提供多清晰度源，比如原画源是test.m3u8, 则hd源即为test_hd.m3u8)
    resolution: {
        required: false,
        type: String,
        default: ''
    },
    // HLS点播流播放时使用：默认播放的清晰度
    resolutiondefault: {
        required: false,
        type: String,
        default: 'hd'
    },
    // HLS点播流播放时使用：倍速列表
    playbackRates: {
        required: false,
        type: Array,
        default: [0.5, 1, 2, 3]
    },
    // HLS点播流播放时使用：默认倍速
    playbackRate: {
        required: false,
        type: Number,
        default: 1
    },
    // HTTP-FLV播放时使用: 是否有音频，传递该属性用于处理只有音频或只有视频的源, Boolean 默认不配置自动判断
    hasaudio: {
        required: false,
        type: Boolean,
        default: true
    },
    // HTTP-FLV播放时使用: 是否有视频，传递该属性用于处理只有音频或只有视频的源, Boolean 默认不配置自动判断
    hasvideo: {
        required: false,
        type: Boolean,
        default: true
    },
    // 自定义工具栏按钮, 配置模板(按钮名称[:class名称]), 多个用英文逗号分隔, 示例：custom-buttons="对讲,配置:vjs-icon-cog"
    customButtons: {
        required: false,
        type: String,
        default: ''
    },
    // autofocusv2.5.2 是否自动获取焦点, Boolean default false
    autofocus: {
        required: false,
        type: Boolean,
        default: false
    },
    // 是否双击全屏
    dblclickFullscreen: {
        required: false,
        type: Boolean,
        default: true
    },
    // 语言(zh-CN/en)
    language: {
        required: false,
        type: String,
        default: 'zh-CN'
    },
    // 水印文字
    waterMark: {
        required: false,
        type: String,
        default: ''
    }
});
</script>

<style lang="scss" scoped>
.video_wrap {
    width: 100%;
    height: 100%;
    position: relative;
}
</style>