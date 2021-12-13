<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\Http\JsonResponseTrait;

class UserController extends Controller
{
    use JsonResponseTrait;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * 現在ログインしているユーザ情報取得
     *
     * @return \App\Models\User|null
     */
    public function show()
    {
        $data = [];

        if (Auth::check()) {
            $data['data'] = Auth::user();
        }

        return $this->success($data);
    }

    /**
     * （ログインユーザで）ユーザ削除API
     *
     * @param Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory
     */
    public function delete(Request $request)
    {
        /** @var App\Models\User $user */
        $user = Auth::user();
        $user->delete();

        // セッションを再生成する
        $request->session()->regenerate();

        return response(null, 204);
    }
}
